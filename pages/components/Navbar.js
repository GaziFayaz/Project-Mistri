import {
    HomeIcon, 
    SearchIcon, 
    LibraryIcon, 
    PlusCircleIcon,
    MenuIcon,
} from "@heroicons/react/outline"

const Navbar = () => {
  return (
    <div className="flex items-center space-x-3 pl-4">
        <p className="link hidden md:inline-flex cursor-pointer">Explore</p>
        <p className="link hidden md:inline-flex cursor-pointer">Sign in</p>
        <button className=":h-5 sm:w-5">
            <MenuIcon/>
        </button>

    </div>
  )
}

export default Navbar