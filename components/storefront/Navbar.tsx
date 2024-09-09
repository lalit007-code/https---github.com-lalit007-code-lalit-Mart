import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const totalCartItem =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <nav className="w-full max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-5 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="#">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Lalit<span className="text-primary">Mart</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center ">
        {user ? (
          <>
            <Link href={"/bag"} className="group p-2 flex items-center mr-2">
              <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {totalCartItem}
              </span>
            </Link>
            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
