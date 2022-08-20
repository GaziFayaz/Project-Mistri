import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { sanityClient } from "../lib/Sanity";
import { ThemeProvider } from "next-themes";

import mistrilogo from "../public/mistri_logo_svg.svg";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

const join = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [expertisesList, setExpertisesList] = useState([
    {
      key: "carpentry",
      value: "Carpentry",
    },
    {
      key: "painting",
      value: "Painting",
    },
    {
      key: "tile work",
      value: "Tile Work",
    },
    {
      key: "waterline",
      value: "Waterline",
    },
  ]);
  const [expertises, setExpertises] = useState([]);
  const [experience, setExperience] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const fileInput1 = Array.from(form.elements).find(
        ({ name }) => name === "certificate"
      );
      console.log(fileInput1);

      const formData1 = new FormData();
      for (const certificate of fileInput1.files) {
        formData1.append("file", certificate);
      }

      formData1.append("upload_preset", "mistri-application");
      const data1 = await fetch(
        "https://api.cloudinary.com/v1_1/dqbr3ydia/image/upload",
        {
          method: "POST",
          body: formData1,
        }
      ).then((r) => r.json());

      // setUploadData(data);
      console.log("data", data1);
      const certificateUrl = data1.secure_url;
      console.log(certificateUrl);

      const fileInput2 = Array.from(form.elements).find(
        ({ name }) => name === "image"
      );
      console.log(fileInput2);
      const formData2 = new FormData();
      for (const image of fileInput2.files) {
        formData2.append("file", image);
      }
      formData2.append("upload_preset", "mistri-application");
      const data2 = await fetch(
        "https://api.cloudinary.com/v1_1/dqbr3ydia/image/upload",
        {
          method: "POST",
          body: formData2,
        }
      ).then((r) => r.json());
      console.log("data", data2);
      const imageUrl = data2.secure_url;
      console.log(imageUrl);

      const newForm = {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        expertises,
        experience,
        certificate: certificateUrl,
        image: imageUrl,
      };
      console.log(newForm);
      await axios.post("http://localhost:3000/api/mistriApplication", newForm);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="md:inline-flex sm:flex-col bg-homebg w-screen min-h-screen">
      <header className="bg-header pr-5 md:max-w-sm">
        <div className="logoButton flex flex-grow items-center">
          <Link href="/">
            <div className="pr-7 pb-2 pl-4 pt-2">
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
          <h1 className="heading font-extrabold text-5xl">Work With Mistri</h1>
          <h3 className="subheading font-semibold  pb-4">
            Make money on your schedule
          </h3>
        </div>
      </header>
      <main className="bg-homebg pl-5 pr-5 py-8 h-full md:w-2/3 md:flex md:items-center">
        <div className="max-w-2xl mx-auto ">
          <h2 className="form-heading text-3xl text-center font-bold">
            Apply for Interview
          </h2>
          <form
            className="form pt-8 space-y-4"
            method="post"
            onSubmit={handleOnSubmit}
          >
            <div className="name flex space-x-2 ">
              <input
                placeholder="First Name*"
                type="text"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                  console.log(firstName);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Last Name"
                type="text"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                  console.log(lastName);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
            </div>
            <input
              placeholder="Email"
              type="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(email);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Phone Number"
              type="text"
              required
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                console.log(phoneNumber);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Address"
              type="Address"
              required
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(address);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Date of Birth"
              type="Date"
              required
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                console.log(dateOfBirth);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <div className="expertise-select flex">
              <Multiselect
                className="bg-white rounded-lg"
                id="css_custom"
                displayValue="key"
                onKeyPressFn={function noRefCheck() {}}
                onSelect={(event) => {
                  setExpertises(event);
                  // console.log(expertises);
                  console.log(expertises);
                }}
                onRemove={(event) => {
                  setExpertises(event);
                  console.log(expertises);
                }}
                // onSearch={(event)=> {console.log(event)}}
                hidePlaceholder="true"
                avoidHighlightFirstOption="false"
                closeIcon="cancel"
                placeholder="Choose Expertise(s)"
                options={expertisesList}
                style={{
                  chips: {
                    // To change css for dropdown options
                    background: "#00D3AD",
                    color: "black",
                  },
                }}
              />
              <ChevronDownIcon className="relative right-8 top-2 w-5 h-5 pointer-events-none stroke-gray-300" />
            </div>
            <input
              placeholder="Experience (years)"
              type="number"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              onChange={(e) => {
                setExperience(e.target.value);
                console.log(experience);
              }}
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
                name="certificate"
                accept=".pdf, image/png, image/jpg, image/jpeg"
                className="bg-gray-100 text-gray-500 rounded-r-md"
              />
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
                name="image"
                required
                accept="image/png, image/jpg, image/jpeg"
                className="bg-gray-100 text-gray-500 rounded-r-md"
                multiple
                onChange={handleOnChange}
              />
              {imageSrc && <img src={imageSrc} height={200} width={200} />}
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default join;
