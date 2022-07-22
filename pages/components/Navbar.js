import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";

import Link from "next/link";

import Explore from "./Explore";
import Sidebar_explore from "./Sidebar_explore";

const Navbar = () => {
  const router = useRouter();
  // const user = false;
  // const username = false;

  // State to track status profile button drop-down menu
  const [showDropdown, setShowDropdown] = useState(false);

  // State to track logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // state to update the username on the navbar
  const [username, setUsername] = useState("");

  // function to logout the user and update logged in status
  const logout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      const isLoggedIn = await magic.user.isLoggedIn();
      setIsLoggedIn(isLoggedIn);
      console.log("User logged Out! isLoggedIn-", isLoggedIn); // => `false`
    } catch (error) {
      // Handle errors if required!
      console.log("could not log out the user", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        setIsLoggedIn(isLoggedIn);
        console.log("Checking isLoggedIn...", isLoggedIn);
        try {
          const { email } = await magic.user.getMetadata();
          if (email) {
            console.log({ email });
            setUsername(email);
          }
        } catch (error) {
          // Handle errors if required!
          console.error("Error retrieving email, error");
        } // => `true` or `false`
      } catch (error) {
        // Handle errors if required!
        console.error("Could not check login information", error);
      }
    })();
  }, []);

  // function to change the profile button drop down state
  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="space-x-4">
      <div className="hidden md:inline-flex cursor-pointer hover:text-white">
        <Explore />
      </div>

      {isLoggedIn ? (
        <div className="hidden md:inline-flex flex-col items-center mt-14 space-y-3 pt-1">
          <button
            className="inline-flex cursor-pointer py-1 px-2 border-2 text-center font-bold rounded-full border-black hover:border-white hover:text-white"
            onClick={handleShowDropdown}
          >
            <p>{username}</p>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-6 w-5"
              aria-hidden="true"
            />
          </button>

          {showDropdown ? (
            <div className="flex-col w-full bg-proDropDown rounded-2xl">
              <Link href={"/manage_account"}>
                <p className="px-4 font-bold rounded-2xl hover:text-white hover:bg-black cursor-pointer text-center">
                  Manage Account
                </p>
              </Link>
              <p
                className="font-bold rounded-2xl hover:text-white hover:bg-black cursor-pointer text-center"
                onClick={logout}
              >
                Sign out
              </p>
            </div>
          ) : (
            <div className="p-6"></div>
          )}
        </div>
      ) : (
        <div className="hidden md:inline-flex items-center">
          <Link href="/login">
            <p className="cursor-pointer hover:text-white font-bold">Sign in</p>
          </Link>

          <button className="cursor-pointer ml-4 mr-4 p-4 border-2 py-1 text-center font-bold rounded-full border-black hover:border-white hover:text-white">
            JOIN
          </button>
        </div>
      )}

      <Disclosure as="nav">
        <Disclosure.Button className=" md:hidden fixed top-2 right-4  item-center peer justify-center rounded-md p-2 text-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu className="md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className=" md:hidden p-6 w-1/2 h-screen bg-slate-400 z-10 fixed top-14 -right-96 lg:right-0 peer-focus:right-0 peer:transition ease-out delay-150 duration-200">
          <div key="sidebar">
            <h1 className=" cursor-pointer font-bold text-blue-900 w-full">
              <Sidebar_explore />
            </h1>
            <Link href="/login">
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
