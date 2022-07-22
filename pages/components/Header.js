import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Navbar from "./Navbar";
import mistrilogo from "../../public/mistri_logo_svg.svg";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { sanityClient } from "../../lib/Sanity";
// import { useEffect } from "react";

const Header = () => {
  // const router = useRouter();
  // const { query = "all" } = router.query;

  // const [state, setState] = useState({
  //   error: "",
  //   loading: true,
  // });

  // const { loading, error, services } = state;

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       let serviceQ = `*[_type == "services"]{service}`;
  //       setState({ loading: true });
  //       const allServices = await sanityClient.fetch(serviceQ);
  //       setState({ allServices, loading: false });
  //     } catch (error) {
  //       setState({ error: error.message, loading: false });
  //     }
  //   };
  //   fetchdata();
  // }, [query]);

  // const [queryall, setQueryAll] = useState("");
  // const queryChangeHandler = (e) => {
  //   setQueryAll(e.target.value);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const searched = queryall.trim();
  //   router.push(`/${searched}`);
  // };

  // const filterSearch = ({ searchQuery }) => {
  //   const path = router.pathname;
  //   const { query } = router;
  //   if (searchQuery) {
  //     query.searchQuery = searchQuery;
  //   }
  //   router.push({
  //     pathname: path,
  //     query: query,
  //   });
  // };

  return (
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

        {/* header-right-side */}
        <div className="flex items-center space-x-3 fixed right-0">
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
