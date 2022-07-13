import {
    HomeIcon, 
    SearchIcon, 
    LibraryIcon, 
    PlusCircleIcon,
    MenuIcon,
} from "@heroicons/react/outline"

const Header = () => {
  return (
    <div className="flex items-center bg-emerald-500 py-4 px-6">
        {/* // "mistri" logo left side */}
        <div className="flex items-center flex-grow" >
            <h1 className=" link font-serif font-medium text-2xl cursor-pointer">
            mistri
            </h1> 
        </div>

        {/* Search bar */}
        <div className="flex items-center flex-grow rounded-full bg-slate-200  ">
            <input 
            type="text" 
            placeholder="Try: House Painter" 
            className=" rounded-md focus:outline-none flex-grow flex-shrink text-center bg-slate-200 text-black" 
            />
            <SearchIcon className="h-14 p-4 cursor-pointer rounded-md hover:bg-gray-900" />
        </div>
        
        {/* // header-right-side */}
        <div className="flex items-center space-x-3 pl-4">
            <p className="link hidden md:inline-flex cursor-pointer">Explore</p>
            <p className="link hidden md:inline-flex cursor-pointer">Sign in</p>
            <button className=":h-5 sm:w-5">
                <MenuIcon/>
            </button>
        </div>
    </div>

  )
}

export default Header