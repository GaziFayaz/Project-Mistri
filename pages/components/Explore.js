import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <div>
      <ul className="flex items-center">
        <li className="p-4">
          <Menu as="div">
            <div>
              <Menu.Button className=" border-none inline-flex justify-center w-full  font-bold hover:text-white focus:outline-none ">
                Explore
              </Menu.Button>
            </div>
          </Menu>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
