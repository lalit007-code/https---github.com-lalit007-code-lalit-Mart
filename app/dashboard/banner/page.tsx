import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EditIcon,
  MoreHorizontal,
  PlusCircle,
  Trash,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function BannerRoute() {
  const bannerList = await getData();
  return (
    <>
      <div className="flex justify-end items-center">
        <Button asChild>
          <Link href="/dashboard/banner/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bannerList.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Image
                      src={banner.imageString}
                      width={64}
                      height={64}
                      alt="product image"
                      className="w-16 h-16 rounded-lg  object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuLabel>Actions </DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>

                        {/* edit link */}
                        {/* <DropdownMenuItem className="flex justify-between items-center gap-x-4 ">
                       <Link
                         className="cursor-pointer"
                         href={`/dashboard/products/${item.id}`}
                       >
                         Edit
                       </Link>
                       <EditIcon className="w-4 h-4" />
                     </DropdownMenuItem> */}

                        {/* delete banner */}
                        <DropdownMenuItem className="flex justify-between items-center gap-x-4 ">
                          <Link href={`/dashboard/banner/${banner.id}/delete`}>
                            Delete
                          </Link>
                          <Trash className="w-4 h-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
