import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { sanityClient } from "../lib/Sanity";
import { ThemeProvider } from "next-themes";

import mistrilogo from "../public/mistri_logo_svg.svg";
import Multiselect from "multiselect-react-dropdown";

const join = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [expertises, setExpertises] = useState([
    {
      key: "Carpentry",
    },
    {
      key: "Paintings",
    },
    {
      key: "Tile Work",
    },
    {
      key: "Waterline",
    },
  ])
  const [experience, setExperience] = useState(null);
  const [certificates, setCertificates] = useState([
    {
      id: 0,
      value:"dummy"
    },
    {
      id:1,
      value: "stupid",
    }
  ]);
  const test = (e) => {
    console.log(e);
  };

  // const handleOnSubmit = ()
  return (
    <div>
      <div className="md:inline-flex sm:flex-col bg-homebg w-screen h-screen">
        <header className="bg-header pr-5 md:max-w-sm">
          <div className="logoButton flex flex-grow items-center">
            <Link href="/">
              <div className=" pr-7 pb-2 pl-4 pt-2">
                <Image
                  src={mistrilogo}
                  height={60}
                  width={60}
                  className="cursor-pointer"
                />
              </div>
            </Link>
            <div className="flex-grow"></div>
            <Link href={"/mistri_login"}>
              <button className=" m-4 py-3 px-3 border-2 border-black rounded-full text-white bg-black font-bold text-xs hover:border-white">
                Have an account?
              </button>
            </Link>
          </div>
          <div className="heading-subheading pl-5 pt-5 space-y-4 max-w-sm">
            <h1 className="heading font-extrabold text-5xl">
              Work With Mistri
            </h1>
            <h3 className="subheading font-semibold  pb-4">
              Make money on your schedule
            </h3>
          </div>
        </header>
        <main className="bg-homebg pl-5 pr-5 py-8 h-screen md:w-2/3 md:flex md:items-center">
          <div className="max-w-2xl mx-auto ">
            <h2 className="form-heading text-3xl text-center font-bold">
              Apply for Interview
            </h2>
            <form className="form pt-8 space-y-4 " >
              <div className="name flex space-x-2 ">
                <input
                  placeholder="First Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
              </div>
              <input
                placeholder="Email"
                // onChange={handleOnChangeEmail}
                type="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                id
                placeholder="Phone Number"
                type="text"
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Address"
                type="Address"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Date of Birth"
                type="Date"
                required
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              {/* <div className="expertise-select flex "> */}
                <Multiselect
                  className="bg-white rounded-lg"
                  id="css_custom"
                  displayValue="key"
                  onKeyPressFn={function noRefCheck() {}}
                  onSelect={(event)=> {console.log(event)}}
                  onRemove={(event)=> {console.log(event)}}
                  // onSearch={(event)=> {console.log(event)}}
                  hidePlaceholder="true"
                  avoidHighlightFirstOption="false"
                  closeIcon="cancel"
                  placeholder="Choose Expertise(s)"
                  options={expertises}
                  style={{
                    chips : { // To change css for dropdown options
                      background: "#00D3AD",
                      color: "black"
                      },
                  }
                    
                  }
                />
                {/* <ChevronDownIcon className="relative right-8 top-2 w-5 h-5 pointer-events-none stroke-gray-300" /> */}
              {/* </div> */}

              <input
                placeholder="Experience (years)"
                type="number"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <div className="rounded-full">
                <label
                  htmlFor="certificate"
                  className="bg-gray-100 py-1.5 pl-2 rounded-l-md text-gray-500"
                >
                  Certifications (if any):{" "}
                </label>
                <input
                  id="certificate"
                  type="file"
                  onChange= { (event) => {
                    // setCertificates([...certificates, {
                    //   id: certificates.length,
                    //   value: event.target.value
                    // }])
                    //   certificates.map(certificate => {
                    //     console.log(certificate.value)
                    // })
                    console.log(event.target.files);
                    setCertificates([... certificates, 
                      {
                        id: certificates.length,
                        value: "event.target.files",
                      }
                    ])
                  } }
                  
                  accept=".pdf, image/png, image/jpg, image/jpeg"
                  className="bg-gray-100 text-gray-500 rounded-r-md"
                  multiple
                />
                <ul>
                  {
                    certificates.map(certificate => (
                      <li key={certificate.id}>{certificate.value}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="rounded-full">
                <label
                  htmlFor="image"
                  className="bg-gray-100 py-1.5 pl-2 rounded-l-md text-gray-500"
                >
                  Photo:{" "}
                </label>
                <input
                  id="image"
                  type="file"
                  required
                  accept="image/png, image/jpg, image/jpeg"
                  className="bg-gray-100 text-gray-500 rounded-r-md"
                  multiple
                />
              </div>

              <button
                type="submit"
                onClick={test}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default join;
