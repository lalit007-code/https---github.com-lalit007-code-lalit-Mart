import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 ">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle>Total revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">$100.00</p>
            <p className=" text-xs text-muted-foreground">
              Based on 100 charges
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle>Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">+50</p>
            <p className=" text-xs text-muted-foreground">
              Total sales on laliitmart
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle>Total Products</CardTitle>
            <PartyPopper className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">37</p>
            <p className=" text-xs text-muted-foreground">
              Total Product created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle>Total users</CardTitle>
            <User2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">120</p>
            <p className=" text-xs text-muted-foreground">
              Total Users Signed up
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="sm:flex h-9 w-9">
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Lalit singh</p>
                <p className="text-muted-foreground text-sm ">test@gmail.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600">$1,999</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="sm:flex h-9 w-9">
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Lalit singh</p>
                <p className="text-muted-foreground text-sm ">test@gmail.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600">$1,999</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="sm:flex h-9 w-9">
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Lalit singh</p>
                <p className="text-muted-foreground text-sm ">test@gmail.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600">$1,999</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="sm:flex h-9 w-9">
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Lalit singh</p>
                <p className="text-muted-foreground text-sm ">test@gmail.com</p>
              </div>
              <p className="ml-auto font-medium text-green-600">$1,999</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
