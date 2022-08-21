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

const servicesQ = `*[_type == "services"]{service, _id}`;

const exploreservices = ({ services }) => {
  return (
    <div className="bg-homebg">
      <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-3">
        {services?.length > 0 &&
          services.map((service) => (
            <div
              key={service._id}
              className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
            >
              <div>
                <Image
                  layout="responsive"
                  src={me}
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
              </div>

              <div className="p-6 bg-header">
                <button className="cursor-pointer  p-4 border-2 py-1 text-center font-bold rounded-full border-black hover:border-white hover:text-white">
                  <h2 className="text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
                    Hire
                  </h2>
                </button>
                <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold px-3">
                  {service.service}
                </h2>
              </div>
            </div>
          ))}

        {/* <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
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
        </div> */}

        {/* <div className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Image layout="responsive" src={vercel} height={500} width={500} />
          <div className="p-2">
            <p></p>
            <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
              Vercel
            </h2>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const services = await sanityClient.fetch(servicesQ);
  return {
    props: { services },
  };
}

export default exploreservices;
