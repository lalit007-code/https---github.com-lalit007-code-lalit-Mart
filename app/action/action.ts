"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "../lib/zodSchema";
import prisma from "../lib/db";

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
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}

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
      isFeatured: submission.value.isFeatured === true ? true : false ,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

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
