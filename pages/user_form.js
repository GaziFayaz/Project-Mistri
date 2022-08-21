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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

  const [image, setImage] = useState(null);
  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const tmpImage = e.target.files[0];
      setImage(tmpImage);
    }
  };

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
    <div className=" h-screen bg-homebg inset-0 ">
      <ToastContainer />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div className="flex-">
            <Image src={mistrilogo} height={350} width={1000} className="" />

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>

          <div>
            <form className="form pt-8 space-y-4 ">
              <div className="name flex space-x-2 ">
                <input
                  placeholder="First Name-[Required]"
                  type="text"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    console.log(firstName);
                  }}
                  className=" appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />

                <input
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    console.log(lastName);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
              </div>
              <input
                placeholder="Email-[Required]"
                type="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
                value={email}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Phone Number-[Required]"
                type="Number"
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  console.log(phoneNumber);
                }}
                value={phoneNumber}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Address"
                type="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                  console.log(address);
                }}
                value={address}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Date of Birth"
                type="Date"
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  console.log(dateOfBirth);
                }}
                value={dateOfBirth}
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
