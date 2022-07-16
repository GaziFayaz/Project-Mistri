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
import Explore from "./Explore";

const Navbar = () => {
  const user = false;
  const username = false;
  return (
    <div className="space-x-4">
      <div className="hidden md:inline-flex cursor-pointer hover:text-white font-bold">
        <Explore />
      </div>
      <Link href="/auth/login">
        <p className="link hidden md:inline-flex cursor-pointer hover:text-white font-bold">
          Sign in
        </p>
      </Link>
      <button className="link hidden md:inline-flex m-4 p-4 border-2 py-1 text-center font-bold font- px-4 rounded-full border-black hover:border-white hover:text-white">
        JOIN
      </button>

      <Disclosure as="nav">
        <Disclosure.Button className=" md:hidden fixed top-2 right-4  item-center peer justify-center rounded-md p-2 text-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu className="md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className=" md:hidden p-6 w-1/2 h-screen bg-slate-400 z-10 fixed top-14 -right-96 lg:right-0 peer-focus:right-0 peer:transition ease-out delay-150 duration-200">
          <div key="sidebar">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900  pb-4 w-full">
              Explore{" "}
            </h1>
            <Link href="/auth/login">
              <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                Sign in{" "}
              </h1>
            </Link>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default Navbar;
