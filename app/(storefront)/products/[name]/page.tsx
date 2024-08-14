import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getProductData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const allData = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: allData,
      };
    }
    case "men": {
      const menData = await prisma.product.findMany({
        where: {
          category: "men",
          status: "published",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: "Products for Men",
        data: menData,
      };
    }
    case "women": {
      const womenData = await prisma.product.findMany({
        where: {
          category: "women",
          status: "published",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: "Products for Women",
        data: womenData,
      };
    }
    case "kids": {
      const kidsData = await prisma.product.findMany({
        where: {
          category: "kids",
          status: "published",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });
      return {
        title: "Products for Kids",
        data: kidsData,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getProductData(params.name);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
