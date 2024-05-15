import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col md:mt-20 mt-4">
      <h1 className="md:text-4xl text-lg font-bold text-center mt-8">
        Where ideas meet solutions: Welcome to Suggestion Share
      </h1>

      <Image
        src="/home.svg"
        height={500}
        alt="Description of your image"
        width={500}
      />
      <Link href="/signup">
        <Button>Create Account</Button>
      </Link>
    </div>
  );
};

export default Home;
