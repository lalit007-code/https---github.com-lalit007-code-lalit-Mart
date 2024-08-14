import prisma from "@/app/lib/db";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getProductData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  //   console.log(params.id);
  const productData = await getProductData(params.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={productData.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {productData.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${productData.price}</p>
          <div className="mt-3 flex item-center gap-1">
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6 ">
            {productData.description}
          </p>
          <Button size="lg" className="w-full mt-5">
            <ShoppingBagIcon className="mr-4 h-5 w-5 " /> Add to cart
          </Button>
        </div>
      </div>

      <div className="mt-16 ">
        <FeaturedProducts />
      </div>
    </>
  );
}
