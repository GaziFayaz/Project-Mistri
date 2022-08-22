import Image from "next/image";
import React, { useState } from "react";
import Nav from "./components/admin/Nav";
import mistri from "../public/mistri_logo_svg.svg";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Link from "next/link";
import mistrilogo from "../public/mistri_logo_svg.svg";
import Multiselect from "multiselect-react-dropdown";
import { ChevronDownIcon } from "@heroicons/react/outline";

const expertise = [];

const adminDashboard = () => {
  const [showService, setShowService] = useState();
  const [serviceName, setServiceName] = useState();
  const [servicePrice, setServicePrice] = useState();
  const [image, setImage] = useState();

  const [showMistri, setShowMistri] = useState();
  const [mistriFirstName, setMistriFirstName] = useState();
  const [mistriLastName, setMistriLastName] = useState();
  const [mistriEmail, setMistriEmail] = useState();
  const [mistriPhoneNumber, setMistriPhoneNumber] = useState();
  const [mistriAddress, setMistriAddress] = useState();
  const [mistriDateOfBirth, setMistriDateOfBirth] = useState();
  const [mistriExpertisesList, setMistriExpertisesList] = useState([
    { key: "carpentry", value: "Carpentry" },
    {
      key: "painting",
      value: "Painting",
    },
    {
      key: "tilework",
      value: "Tile Work",
    },
    {
      key: "waterline",
      value: "Water line",
    },
  ]);
  const [mistriExpertises, setMistriExpertises] = useState([]);
  const [mistriExperience, setMistriExperience] = useState();
  const [mistriImageUrl, setMistriImageUrl] = useState();
  const [mistriCertificateUrl, setMistriCertificateUrl] = useState();

  const [showHireReqs, setShowHireReqs] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  const handleOnSubmitService = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "image"
      );
      console.log(fileInput);
      const formData = new FormData();
      for (const image of fileInput.files) {
        formData.append("file", image);
      }
      formData.append("upload_preset", "mistri-application");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dqbr3ydia/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      console.log("data", data);
      const imageUrl = data.secure_url;
      console.log(imageUrl);
      const Body = {
        name: serviceName,
        price: servicePrice,
        image: imageUrl,
      };
      const result = await fetch(`/api/services`, {
        body: JSON.stringify(Body),
        method: "POST",
      });
      console.log(Body);
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOnSubmitMistri = async (event) => {
    event.preventDefault();

    try {
      for (let key in mistriExpertises) {
        // console.log(expertises[k].value);
        expertise.push(mistriExpertises[key].value);
      }
      console.log("expertise is " + expertise);
      const Body = {
        firstName: mistriFirstName,
        lastName: mistriLastName,
        email: mistriEmail,
        phoneNumber: mistriPhoneNumber,
        address: mistriAddress,
        dateOfBirth: mistriDateOfBirth,
        expertises: expertise,
        experience: mistriExperience,
        certificate: mistriCertificateUrl,
        image: mistriImageUrl,
      };
      const result = await fetch(`/api/mistri`, {
        body: JSON.stringify(Body),
        method: "POST",
      });
      const json = await result.json();
      console.log(Body);
      return json;
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="bg-homebg min-h-screen flex">
      <div className=" w-64 py-4 px-3 w-30 min-h-screen bg-header rounded-b-xl dark:bg-gray-800 sm:max-w-min md:max-w-lg">
        <ul className="space-y-2">
          <li
           
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
           
            onClick={(e) => {
                setShowService(true);
                setShowHireReqs(false);
                setShowMistri(false);
              }}
          
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              ></path>
            </svg>
            <span className="ml-3 font-bold">Service</span>
          </li>
          <li
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700cursor-pointer"
            onClick={(e) => {
              setShowMistri(true);
              setShowService(false);
              setShowHireReqs(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span className="ml-3 whitespace-nowrap font-bold">Mistri</span>
          </li>
          <li
           
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700cursor-pointer"
           
            onClick={(e) => {
                setShowService(false);
                setShowHireReqs(true);
                setShowMistri(false);
              }}
          
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap font-bold">
              Hire Requests
            </span>
          </li>
          <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <span className="flex-1 ml-3 font-bold whitespace-nowrap">
              Log Out
            </span>
          </li>
        </ul>
      </div>

      {showService && (
        <div className="pl-5 pr-5 py-8 min-h-screen w-full min-w-full items-center">
          <form
            className="space-y-5 max-w-xl justify-center items-center"
            onSubmit={handleOnSubmitService}
          >
            <input
              placeholder="Service Name"
              type="text"
              id="name"
              name="name"
              // value={serviceName}
              className="appearance-none relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              required
              onChange={(e) => {
                setServiceName(e.target.value);
                console.log(serviceName);
              }}
            />
            <input
              placeholder="Service Price"
              type="number"
              id="price"
              name="price"
              // value={servicePrice}
              className="appearance-none relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              required
              onChange={(e) => {
                console.log(e.target.value);
                setServicePrice(parseInt(e.target.value), 10);
              }}
            />
            <div className="rounded-full flex">
              <div>
                <label
                  htmlFor="image"
                  className="bg-gray-100 py-1.5 pl-2 rounded-l-md text-gray-500"
                >
                  Service Image:{" "}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  // value={serviceName}
                  accept=".pdf, image/png, image/jpg, image/jpeg"
                  className="bg-gray-100 text-gray-500 rounded-r-sm w-64"
                  required
                  onChange={handleOnChange}
                />
              </div>

              {image && <img src={image} height={200} width={200} />}
            </div>
            <button
              type="submit"
              className="group relative w-96 mt-3 flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showMistri && (
        <div className="m-40 ml-50 min-w-full items-center ">
          <h1 className="text-center max-w-xl font-semibold text-gray-700 text-2xl">
            New Mistri
          </h1>
          <form
            className="form pt-4 space-y-4 max-w-xl justify-center items-center"
            method="post"
            onSubmit={handleOnSubmitMistri}
          >
            <div className="name flex space-x-2 ">
              <input
                placeholder="First Name*"
                type="text"
                required
                onChange={(e) => {
                  setMistriFirstName(e.target.value);
                  console.log(mistriFirstName);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Last Name"
                type="text"
                required
                onChange={(e) => {
                  setMistriLastName(e.target.value);
                  console.log(mistriLastName);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
            </div>
            <input
              placeholder="Email"
              type="Email"
              required
              onChange={(e) => {
                setMistriEmail(e.target.value);
                console.log(mistriEmail);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Phone Number"
              type="text"
              required
              onChange={(e) => {
                setMistriPhoneNumber(e.target.value);
                console.log(mistriPhoneNumber);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Address"
              type="Address"
              required
              onChange={(e) => {
                setMistriAddress(e.target.value);
                console.log(mistriAddress);
              }}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
            />
            <input
              placeholder="Date of Birth"
              type="Date"
              required
              onChange={(e) => {
                setMistriDateOfBirth(e.target.value);
                console.log(mistriDateOfBirth);
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
                  setMistriExpertises(event);
                  // console.log(mistriExpertises);
                }}
                onRemove={(event) => {
                  setMistriExpertises(event);
                  console.log(mistriExpertises);
                }}
                // onSearch={(event)=> {console.log(event)}}
                hidePlaceholder="true"
                avoidHighlightFirstOption="false"
                closeIcon="cancel"
                placeholder="Choose Expertise(s)"
                options={mistriExpertisesList}
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
                setMistriExperience(e.target.value);
                console.log(mistriExperience);
              }}
            />
            <div className="URL flex space-x-2 ">
              <input
                placeholder="Certificate URL"
                type="text"
                required
                onChange={(e) => {
                  setMistriCertificateUrl(e.target.value);
                  console.log(mistriCertificateUrl);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Image URL"
                type="text"
                required
                onChange={(e) => {
                  setMistriImageUrl(e.target.value);
                  console.log(mistriImageUrl);
                }}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default adminDashboard;
