import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="md:fixed md:bottom-0 md:w-full mt-6  md:py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Suggestion Share. All rights reserved.</p>

        <div className="flex md:justify-end justify-center space-x-4 ">
          <Link href="">
            <Linkedin />
          </Link>
          <Link href="">
            <Twitter />
          </Link>
          <Link href="">
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
