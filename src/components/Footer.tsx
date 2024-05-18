import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="md:fixed md:bottom-0 md:w-full mt-6  md:py-4">
      <div className="container mx-auto text-center">
        <p className="">&copy; 2024 Suggestion Share. All rights reserved. by Arihant Jain</p>

        <div className="flex md:justify-end justify-center space-x-4 ">
          <Link href="https://www.linkedin.com/in/arihantdotcom/">
            <Linkedin />
          </Link>
          <Link href="https://x.com/Arihantdotcom">
            <Twitter />
          </Link>
          <Link href="https://x.com/Arihantdotcom">
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
