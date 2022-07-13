import {
    HomeIcon, 
    SearchIcon, 
    LibraryIcon, 
    PlusCircleIcon,
    MenuIcon,
} from "@heroicons/react/outline"
import Link from "next/link"

const Navbar = () => {
  const user = false
  const username = false  
  return (
    <div className="flex items-center space-x-3 pl-4">
        <Link href="/exploreservices">
            <p className="hidden md:inline-flex cursor-pointer">Explore</p>
        </Link>

        {/* username is false then sign in will be displayed */}
        {!username && (
            <>
                 <Link href="#">
                    <p className="link hidden md:inline-flex cursor-pointer">Sign in</p>
                </Link>
            </>
        )}

       
        
        
        <button className=":h-5 sm:w-5">
            <MenuIcon/>
        </button>

    </div>
  )
}

export default Navbar