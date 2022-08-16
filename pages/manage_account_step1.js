import Router, { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

import mistrilogo from "../public/mistri_logo_svg.svg";
import { useState } from "react";

const manage_account_step1 = () => {
  const router = useRouter();
  const [queryall, setQueryAll] = useState("");
  const queryChangeHandler = (e) => {
    setQueryAll(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const searched = queryall.trim();
    router.push(`/Search/${searched}`);
  };
  return (
    <div>
      <header>
        <div className="fixed z-10 top-0 left-0 right-0 flex items-center bg-header px-4 py-1 h-14 ">
          {/* "mistri" logo left side */}
          <Link href="/">
            <div className="flex items-center pr-7 pb-1">
              <Image
                src={mistrilogo}
                height={55}
                width={55}
                className="cursor-pointer"
              />
            </div>
          </Link>

          {/* Search bar */}
          <div>
            <form
              onSubmit={submitHandler}
              className="flex items-center rounded-full bg-slate-200 h-8 w-auto"
            >
              <SearchIcon className="h-14 pl-4 pt-4 pb-4 cursor-pointer rounded-md hover:stroke-emerald-500" />
              <input
                type="text"
                placeholder="search services"
                onChange={queryChangeHandler}
                className=" rounded-md focus:outline-none text-left bg-slate-200 text-black mr-5 pl-3 w-60"
              />
            </form>
          </div>
        </div>
      </header>

      <div className=" bg-homebg h-screen">
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-6">
          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Large input
          </label>
          <input
            type="text"
            id="large-input"
            class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default manage_account_step1;
