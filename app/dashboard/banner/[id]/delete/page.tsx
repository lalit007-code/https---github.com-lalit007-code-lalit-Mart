import { deleteBanner } from "@/app/action/action";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteBanner({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action can not be undone. This will permanetly delete this
            banner and remove all data from servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className=" w-full flex justify-between">
          <Button variant="secondary" asChild>  
            <Link href={`/dashboard/banner`}> Cancel </Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            <SubmitButton variant={"destructive"} text="Delete Product" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
