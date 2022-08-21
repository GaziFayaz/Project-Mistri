import Head from "next/head";
import Header from "./components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { ToastContainer, toast } from "react-toastify";
import { didToken } from "./loginWithEmail";
import FourOhFour from "../lib/FourOhFour";

import "react-toastify/dist/ReactToastify.css";
import { async } from "@firebase/util";

const user_form = () => {
  const [imageSrc, setImageSrc] = useState();
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  function handleOnSubmit = async (event) => {
    event.preventDefault();

    try{
      const form 
    }
  }

  toast.info("Fill in the required fields", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <div className=" min-h-screen bg-homebg inset-0 ">
      <ToastContainer />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div className="flex-">
            <Image src={mistrilogo} height={350} width={1000} className="" />

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
              Registration
            </h2>
          </div>

          <div>
            <form className="form pt-8 space-y-4 ">
              <div className="name flex space-x-2 ">
                <input
                  placeholder="First Name-[Required]"
                  type="text"
                  required
                  className=" appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />

                <input
                  placeholder="Last Name"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
              </div>
              <input
                placeholder="Email-[Required]"
                type="Email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Phone Number-[Required]"
                type="Number"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Address"
                type="Address"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Date of Birth"
                type="Date"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Experiences"
                type="experiences"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="multiple_files"
              >
                Upload Your Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:border-green-700  dark:placeholder-gray-400"
                id="image"
                type="file"
                onChange={uploadToClient}
              />
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps() {
//   if (!didToken) {
//     return {
//       notFound: true,
//     };
//   }
// }
export default user_form;
