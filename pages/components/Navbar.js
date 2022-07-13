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
    <div className=" space-x-3">
      <p className="link hidden md:inline-flex cursor-pointer hover:text-white font-bold">
        Explore
      </p>
      <Link href={"/login"}>
        <p className="link hidden md:inline-flex cursor-pointer hover:text-white font-bold">
          Sign in
        </p>
      </Link>
      <button className="link hidden md:inline-flex m-4 p-4 border-2 py-1 text-center font-bold font- px-4 rounded-full border-black hover:border-white hover:text-white">
        JOIN
      </button>
      <button className="h-5 sm:w-5">
        <MenuIcon />
      </button>
    </div>
  );
};

export default Navbar;
