import prisma from "@/app/lib/db";
import { ProductCard } from "@/components/storefront/ProductCard";
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
  const { data, title } = await getProductData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
