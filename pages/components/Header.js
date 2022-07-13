import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center bg-header px-4 py-1 h-14">
      {/* // "mistri" logo left side */}
      <div className="flex items-center pr-5">
        <h1 className=" link font-poppins font-bold text-2xl cursor-pointer">
          mistri
        </h1>
      </div>

      {/* Search bar */}
      <div className="flex items-center rounded-full bg-slate-200 h-8 w-auto">
        <SearchIcon className="h-14 pl-4 pt-4 pb-4 cursor-pointer rounded-md hover:stroke-emerald-500" />
        <input
          type="text"
          placeholder="search services"
          className=" w-full rounded-md focus:outline-none text-left bg-slate-200 text-black mr-5 pl-3"
        />
      </div>

      {/* // header-right-side */}
      <div className="flex items-center space-x-3 px-4 fixed right-0">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
