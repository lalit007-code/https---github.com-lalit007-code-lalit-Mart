"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "../lib/zodSchema";
import prisma from "../lib/db";
import { toast } from "@/components/ui/use-toast";

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
