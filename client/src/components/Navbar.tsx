"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-black/40 backdrop-blur-[2px] shadow-lg text-white">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link
            href="/"
            className="cursor-pointer"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={24}
                height={24}
                className="w-[32px] h-[32px]"
              />
              <div className="text-xl font-bold text-yellow-400 hover:text-yellow-500">
                REAL
                <span className="text-white hover:text-yellow-500 font-medium ml-[4px]">
                  ESTATE
                </span>
              </div>
            </div>
          </Link>

        </div>
        {/* {!isDashboardPage && (
          <p className="text-primary-200 hidden md:block">
            Find your ideal rental apartment using our powerful search tools.
          </p>
        )} */}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
              {isDashboardPage && (
                <Button
                  variant="secondary"
                  className="cursor-pointer md:ml-4 bg-primary-50 hover:bg-yellow-400 
                  
                  text-yellow-400 hover:text-white"
                  onClick={() =>
                    router.push(
                      authUser.userRole?.toLowerCase() === "manager"
                        ? "/managers/newproperty"
                        : "/search"
                    )
                  }
                >
                  {authUser.userRole?.toLowerCase() === "manager" ? (
                    <>
                      <Plus className="h-4 w-4" />
                      <span className="text-black hidden md:block ml-2">Add New Property</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span className="text-black hidden md:block ml-2">
                        Search Properties
                      </span>
                    </>
                  )}
                </Button>
              )}

              {!isDashboardPage && (
                <Button
                  variant="secondary"
                  className="cursor-pointer bg-transparent text-white border-[1px] border-yellow-400 hover:border-yellow-200 hover:text-yellow-400"
                  onClick={() =>
                    router.push(
                      authUser.userRole?.toLowerCase() === "manager"
                        ? "/managers/properties"
                        : "/tenants/favorites"
                    )
                  }
                >
                  <span className="text-[12px] uppercase tracking-widest">
                    Dashboard
                  </span>
                </Button>
              )}

              {/* <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div> */}
              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer  text-white hover:text-white/80" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 focus:outline-hidden">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-yellow-400 hover:bg-amber-500">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem
                    className="font-bold mb-[10px]"
                  >
                    <p className="">
                      {authUser.userInfo?.name}
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700! hover:text-primary-100! font-bold"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700! hover:text-primary-100!"
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700! hover:text-primary-100!"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="cursor-pointer text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="cursor-pointer text-black bg-yellow-400 hover:bg-yellow-500 hover:text-white rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
