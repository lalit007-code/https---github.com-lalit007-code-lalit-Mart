import prisma from "@/app/lib/db";
import { EditForm } from "@/components/dashboard/EditForm";
import { notFound } from "next/navigation";

//data fetching by id
async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

//rendering data fetched by given id ,form to edit  
export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <div>
      <EditForm data={data} />
    </div>
  );
}
