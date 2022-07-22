import React from "react";
// import Search from "./Search";
import { sanityClient } from "../lib/Sanity";
import Header from "./components/Header";
// import serviceQ from "/pages/Search";

const exploreservices = () => {
  return (
    <>
      <Header />
      {/* <div>{ser?.length > 0 && <h1 key={ser._id}>{ser.services}</h1>}</div> */}

      <div className=" pt-16">I am Explore page</div>
    </>
  );
};

// export async function getStaticProps() {
//   const ser = await sanityClient.fetch(serviceQ);
//   return {
//     props: { ser },
//   };
// }

export default exploreservices;
