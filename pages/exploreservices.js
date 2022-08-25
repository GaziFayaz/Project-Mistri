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

const servicesQ = `*[_type == "services"]{name, _id, image}`;
let i = 0;

const exploreservices = ({ services, serImage }) => {
  return (
    <div className="bg-homebg min-h-screen">
      <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-3">
        {services?.length > 0 &&
          services.map((service) => (
            <div
              key={service._id}
              className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
            >
              <div>
                <Image
                  src={serImage[i++]}
                  height={500}
                  width={600}
                  className="rounded-t-lg"
                />
                <div className="bg-header rounded-b-lg ml--2">
                  <button className="cursor-pointer  p-4 border-2 py-1 text-center font-bold rounded-full border-black hover:border-white hover:text-white">
                    <h2 className="text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold">
                      Hire
                    </h2>
                  </button>
                  <h2 className="mt-1 text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold px-3">
                    {service.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const serImage = [];
  const services = await sanityClient.fetch(servicesQ);
  for (let index = 0; index < services.length; index++) {
    const element = services[index].image;
    serImage.push(element);
  }
  // console.log(serImage);
  return {
    props: { services, serImage },
  };
}

export default exploreservices;
