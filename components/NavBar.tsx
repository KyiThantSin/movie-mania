import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-between p-8 text-lg border-b-2 sticky top-0 bg-white z-10">
      <Link href={"/"} className="font-bold text-fuchsia-800">
        Mania
      </Link>
      <Link href={"/browse"}>Browse</Link>
    </nav>
  );
};

export default NavBar;
