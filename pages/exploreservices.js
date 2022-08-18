import Image from "next/image";
import React from "react";
// import Search from "./Search";
import { sanityClient } from "../lib/Sanity";
import Header from "./components/Header";
import car from "../public/carpenter.jpg";
import me from "../public/me.jpg";
import mistrilogo from "../public/mistri_logo_svg.svg";
import painter from "../public/painter.jpg";
import vercel from "../public/vercel.svg";
// import serviceQ from "/pages/Search";

const exploreservices = () => {
  return (
    <div className="bg-homebg">
      <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-3">
        <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image layout="responsive" src={me} height={500} width={500} />
          <div className="p-2">
            <p></p>
            <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
              Me
            </h2>
          </div>
        </div>
        <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image layout="responsive" src={car} height={500} width={500} />
          <div className="p-2">
            <p></p>
            <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
              Carpenter
            </h2>
          </div>
        </div>
        <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image layout="responsive" src={painter} height={500} width={500} />
          <div className="p-2">
            <p></p>
            <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
              Painter
            </h2>
          </div>
        </div>

        <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image layout="responsive" src={vercel} height={500} width={500} />
          <div className="p-2">
            <p></p>
            <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
              Vercel
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps() {
//   const ser = await sanityClient.fetch(serviceQ);
//   return {
//     props: { ser },
//   };
// }

export default exploreservices;
