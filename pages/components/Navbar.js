import { Disclosure } from "@headlessui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const Navbar = () => {
  const user = false;
  const username = false;
  return (
    <div className="space-x-4">
      <p className="link hidden md:inline-flex cursor-pointer hover:text-white font-bold">
        Explore
      </p>
      <Link href="/auth/dummylogin">
        <p className="link hidden md:inline-flex cursor-pointer hover:text-white font-bold">
          Sign in
        </p>
      </Link>
      <button className="link hidden md:inline-flex m-4 p-4 border-2 py-1 text-center font-bold font- px-4 rounded-full border-black hover:border-white hover:text-white">
        JOIN
      </button>

      <Disclosure as="nav">
        <Disclosure.Button className="fixed top-2 right-4 inline-flex item-center peer justify-center rounded-md p-2 text-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -right-96 lg:right-0 peer-focus:right-0 peer:transition ease-out delay-150 duration-200">
           
        </div>
      </Disclosure>
    </div>
  );
};

export default Navbar;
