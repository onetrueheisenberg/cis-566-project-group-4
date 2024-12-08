import React from "react";
import Link from "next/link";
import Cart from "../svgs/Cart";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-4">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Cloudbite</Link>
        </div>
        <div className="space-x-4">
          <Link href="/cart" className=" text-white hover:text-gray-400">
            <Cart />
          </Link>
          {/* <Link href="/admin" className="hover:text-gray-400">
            Admin
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
