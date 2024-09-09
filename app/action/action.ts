"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "../lib/zodSchema";
import prisma from "../lib/db";
import { toast } from "@/components/ui/use-toast";
import { redis } from "../lib/redis";
import { Cart } from "../lib/interfaces";
import { revalidatePath } from "next/cache";

//create product
export async function createProduct(prevState: unknown, formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lalit284546@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formdata, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  //spliting images
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      price: submission.value.price,
      category: submission.value.category,
      description: submission.value.description,
      status: submission.value.status,
      images: flattenUrls,
      //need to review below line
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  return redirect("/dashboard/products");
}

//edit product
export async function editProduct(prevState: any, formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lalit284546@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formdata, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  //spliting images
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const id = formdata.get("productId") as string;

  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: submission.value.name,
      price: submission.value.price,
      category: submission.value.category,
      description: submission.value.description,
      status: submission.value.status,
      //need to overview on below line
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

//delet product
export async function deleteProduct(formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lalit284546@gmail.com") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formdata.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

//create Banner

export async function createBanner(prevData: any, formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lalit284546@gmail.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formdata, { schema: bannerSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

//delet banner
export async function deleteBanner(formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "lalit284546@gmail.com") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formdata.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

//Cart
export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  //for making specfic Cart with key-pair(cart-userId) to add product on redis db to do operation on cart data
  //found cart in db for specific user
  //if found ,either it has items or not
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  //fetching product data by given id to add that on cart from db
  const selectedProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
    },
  });

  if (!selectedProduct) {
    throw new Error("No Product with this id");
  }

  //using this object for new cart
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    // making new cart
    //nothing in the cart
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          id: selectedProduct.id,
          quantity: 1,
        },
      ],
    };
  } else {
    //where the user has cart or items too

    //later on to check item is already in cart or not
    let itemFound = false;

    //update the existing qunatity of item , if there is nothing then add one item to cart
    //using  above new cart to
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  //to load again with cache
  revalidatePath("/", "layout");
}

export async function DeleteCartItem(formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formdata.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updatedCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updatedCart);
  }

  revalidatePath("/bag");
}
