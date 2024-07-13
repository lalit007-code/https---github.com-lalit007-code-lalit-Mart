"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { SubmitButton } from "../SubmitButton";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { categories } from "@/app/lib/categories";
import { useState } from "react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { createProduct, editProduct } from "@/app/action/action";
import { productSchema } from "@/app/lib/zodSchema";
import { type $Enums } from "@prisma/client";
//only imported types not whole code

interface FormProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

export function EditForm({ data }: FormProps) {
  //for great user experience so user can interact with uploaded image
  const [images, setImages] = useState<string[]>(data.images);

  //server action and intial state

  const [lastResult, action] = useFormState(editProduct, undefined);
  //conform-to-zod?
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <>
      <form action={action} id={form.id} onSubmit={form.onSubmit}>
        <input type="hidden" name="productId" value={data.id} />
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/products">
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
        </div>
        <Card className="mt-5 ">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Edit your product here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  className="w-full"
                  placeholder="Product Name"
                  type="text"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={data.name}
                />
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={data.description}
                  placeholder="Write your Product description here..."
                />
                <p className="text-red-500">{fields.description.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  key={fields.price.key}
                  name={fields.price.name}
                  defaultValue={data.price}
                  type="number"
                  placeholder="$55"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Featured</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  defaultChecked={data.isFeatured}
                />
                <p className="text-red-500">{fields.isFeatured.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={data.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.status.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={data.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.status.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <input
                  type="hidden"
                  value={images}
                  key={fields.images.key}
                  name={fields.images.name}
                  defaultValue={fields.images.initialValue as any}
                />
                {images.length > 0 ? (
                  <div className="flex gap-5">
                    {images.map((image, index) => (
                      <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="Product Image"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          type="button"
                          className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadDropzone
                    className="cursor-pointer"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url));
                    }}
                    onUploadError={() => {
                      alert("Something went wrong");
                    }}
                  />
                )}
              </div>
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Edit Product" />
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
