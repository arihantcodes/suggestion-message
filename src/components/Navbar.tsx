"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode";

const page = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    <>
      <nav className="flex justify-between items-center md:mt-5 mt-2">
        <div className="md:ml-12 ml-2">
          <Link href="/" className="font-extrabold md:text-xl text-[13px]">SUGGESTION SHARE</Link>
          </div>
          <div className="mr-12  ">
          {session ? (
            <>
              <span className="mr-4 hidden md:block">Welcome,{user.username || user.email}</span>
              <Button className="md:mr-5" onClick={() =>signOut()}>Logout</Button>
            </>
          ) : (
           <Link href="/signup">
            <Button className="md:mr-5 ">Login</Button>
           </Link>
          )}
          <ModeToggle />
          </div>
        
      </nav>
    </>
  );
};

export default page;
