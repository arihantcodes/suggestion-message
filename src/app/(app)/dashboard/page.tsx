"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

const page = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    <>
      <nav className="flex justify-evenly align-middle">
        <div className="gap-4">
          <Link href="/">Suggestion Share</Link>
          {session ? (
            <>
              <span>Welcome,{user.username || user.email}</span>
              <Button onClick={() =>signOut()}>Logout</Button>
            </>
          ) : (
           <Link href="/login">
            <Button>Login</Button>
           </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default page;
