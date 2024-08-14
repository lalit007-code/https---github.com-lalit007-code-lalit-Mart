import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={item}
                  alt="product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-green-200 text-cyan px-2 py-1 text-xs font-medium ring-1 ring-inset ring-secondary/10">
          ${item.price}
        </h3>
      </div>

      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>

      <Button asChild className="w-full mt-5 ">
        <Link href={`/product/${item.id}`}>Learn more </Link>
      </Button>
    </div>
  );
}
