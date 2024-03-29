import { ArrowCircleLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { magic } from "../lib/magic-client";
import { sanityClient } from "../lib/Sanity";
let reqId = "";
let mId = "";
let mName = "";
let mPhone = "";
let completedReqId = "";
let completedMName = "";
let completedMPhone = "";
let status = "";

const hireReqQ = `*[_type == "hireReq"]{
  _id,
  name, 
  description, 
  cId,
  cName,
  cphone,
  cAddress,
}`;
const onGoingReqsQ = `*[_type == "onGoingReqs"]{reqId, mName, mPhone}`;
const allMistri = `*[_type == "mistri"]`;
const hireReqQ2 = `*[_type == "hireReq"]{ _id, cName, name}`;
const mistriQ = `*[_type == "mistri"]{_id, first_name,phone_number, expertises}`;

const expertise = [];
const allServices = `*[_type == "services"]`;

const adminDashboard = ({
  hireReqs,
  services,
  allMistries,
  onGoingReqs,
  hireReqs2,
  mistris,
}) => {
  const router = useRouter();
  const logOut = () => {
    sessionStorage.removeItem("AdminToken");
    router.push("/");
  };
  const authorization = async () => {
    // let token = window.sessionStorage.getItem("Token");
    try {
      // const token = window.sessionStorage.getItem("Token");
      const didToken = await magic.user.isLoggedIn();

      if (didToken) {
        router.push("/FOF");
      }
    } catch (error) {
      console.log(error);
    }
  };
  authorization();
  const [showService, setShowService] = useState(true);
  const [assignment, setAssignment] = useState(false);
  const [reqId, setReqId] = useState("");
  const [mId, setmId] = useState("");
  const [mName, setmName] = useState("");
  const [mPhone, setmPhone] = useState("");
  const [mExpertise, setmExpertise] = useState([]);
  const [workDone, setworkDone] = useState(false);
  // const [serviceButton, setServiceButton] = useState(true);

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

  const deleteService = async (service) => {
    // try {
    //   console.log("Inside");
    //   const Body = {
    //     name: service.name,
    //     // price: service.price,
    //     // image: service.image,
    //   };
    //   console.log(Body);
    //   const result = await fetch(`/api/services`, {
    //     body: JSON.stringify(Body),
    //     method: "DELETE",
    //   });
    //   const json = await result.json();
    // } catch (error) {
    //   console.log("error", error);
    // }
    client
      .delete({ query: '*[_type == "services"]{name}' })
      .then(console.log)
      .catch(console.error);
  };
  const handleAssign = () => {};

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
  const addAssignedMistri = async (event) => {
    try {
      const Body = {
        reqId: reqId,
        mId: mId,
        mName: mName,
        mPhone: mPhone,
      };
      const result = await fetch(`/api/onGoingAssignedMistri`, {
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

  const addCompletedRequests = async (e) => {
    try {
      const Body = {
        reqId: completedReqId,
        mName: completedMName,
        mPhone: completedMPhone,
        status: status,
      };
      const result = await fetch(`/api/addCompletedReqs`, {
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
    <div className="bg-homebg inset-0 flex">
      <div className=" w-64 py-4 px-3 min-h-screen bg-header rounded-b-xl dark:bg-gray-800  ">
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
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
          <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
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
            <span
              className="flex-1 ml-3 font-bold whitespace-nowrap"
              onClick={logOut}
            >
              Log Out
            </span>
          </li>
        </ul>
      </div>

      {showService && (
        <div className="flex flex-col inset-0 min-w-full justify-center items-center pr-20">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-black">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 border-2 border-black text-lg"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 border-2 border-black text-lg"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 border-2 border-black text-lg"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {services?.length > 0 &&
                  services.map((service) => (
                    <tr
                      key={service._id}
                      className="bg-white border-2 border-black dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 text-lg whitespace-nowrap dark:text-white"
                      >
                        {service.name}
                      </th>
                      <td className="py-4 px-6 text-lg border-2 border-black">
                        {service.price}tk.
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
                          onClick={(e) => {
                            console.log(e);
                            deleteService(service);
                            console.log(service);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <form
            className="pt-20 space-y-5 max-w-md justify-center items-center"
            onSubmit={handleOnSubmitService}
          >
            <h1 className="w-full text-center font-bold text-xl px-3 py-2">
              New Service
            </h1>
            <input
              placeholder="Service Name"
              type="text"
              id="name"
              name="name"
              // value={serviceName}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
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
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              required
              onChange={(e) => {
                console.log(e.target.value);
                setServicePrice(parseInt(e.target.value), 10);
              }}
            />
            <div className="rounded-full inline-flex">
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
                  className="bg-gray-100 text-gray-500 rounded-r-sm"
                  required
                  onChange={handleOnChange}
                />
              </div>

              {image && <img src={image} height={200} width={200} />}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              Add New Service
            </button>
          </form>
        </div>
      )}
      {/* m-40 ml-50  items-center     relative sm:rounded-lg  */}

      {showMistri && (
        <div className="flex flex-col inset-0 min-w-full justify-center items-center pr-20">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-black">
                <tr>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Expertise
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Experience
                  </th>
                  <th
                    scope="col"
                    className="py-1 px-3 text-center border-2 border-black text-sm"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mistris?.length > 0 &&
                  mistris.map((mistri) => (
                    <tr className="bg-white border-2 border-black dark:bg-gray-900 dark:border-gray-700">
                      <td
                        scope="row"
                        className="py-1 px-3 text-center font-medium text-gray-900 text-sm whitespace-nowrap dark:text-white"
                      >
                        {mistri.first_name} {mistri.last_name}
                      </td>
                      <td className="py-1 px-3 text-center text-sm border-2 border-black text-gray-900">
                        {mistri.email}
                      </td>
                      <td className="py-1 px-3 text-center text-sm border-2 border-black text-gray-900">
                        {mistri.phone_number}
                      </td>
                      <td className="py-1 px-3 text-center text-sm border-2 border-black text-gray-900">
                        {mistri.address}
                      </td>
                      <td className="py-1 px-3 text-center text-sm border-2 border-black text-gray-900">
                        {(mistri.expertises).map((expertise) => (
                          <p>{expertise}</p>
                        ))}
                      </td>
                      <td className="py-1 px-3 text-center text-sm border-2 border-black text-gray-900">
                        {mistri.experience}
                      </td>
                      <td className="py-1 px-3 text-center ">
                        <button className="font-medium text-sm text-red-600 dark:text-red-500 hover:underline" 
                        onClick={(e) => {
                          console.log(e);
                          // deleteService(mistri);
                          // console.log(mistri)
                        }} >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
      {showHireReqs && (
        <div className=" flex px-36 py-16 inset-0 justify-center  ">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="py-3 px-6">
                    Customer ID
                  </th> */}
                  <th scope="col" className="py-3 px-6">
                    Customer Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Customer Phone Number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Requested Service
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                </tr>
              </thead>
              {hireReqs?.length > 0 &&
                hireReqs.map((hireReq) => (
                  <tbody>
                    <tr
                      key={hireReq._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {hireReq.cId}
                      </th> */}
                      <td className="py-4 px-6">{hireReq.cName}</td>
                      <td className="py-4 px-6">{hireReq.cphone}</td>
                      <td className="py-4 px-6">{hireReq.name}</td>
                      <td className="py-4 px-6">{hireReq.description}</td>
                      <td className="py-4 px-6">
                        <button
                          className=" py-4 px-6 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            reqId = `${hireReq._id}`;
                            console.log(hireReq._id, reqId);
                            setShowHireReqs(false);
                            setShowMistri(false);
                            setShowService(false);
                            setAssignment(true);
                          }}
                        >
                          Assign
                        </button>
                      </td>
                      <td className="py-4 px-6">pending</td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      )}
      {assignment && (
        <div className="flex px-36 py-16 inset-0 justify-center">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Mistri Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mistri Phone Number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Skills
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mistri Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {allMistries?.length > 0 &&
                  allMistries.map((m) => (
                    <tr
                      key={m._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {m.first_name}
                      </th>
                      <td className="py-4 px-6">{m.phone_number}</td>
                      <td className="py-4 px-6">{m.expertises},</td>
                      <td className="py-4 px-6">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={(e) => {
                            if (availability) {
                              e.preventDefault();
                              mId = `${m._id}`;
                              mName = `${m.first_name}`;
                              mPhone = `${m.phone_number}`;
                              addAssignedMistri();
                              setAssignment(false);
                              setonGoingAssignment(true);
                              setAvailability(false);
                            } else {
                              alert("You cannot choose this Mistri");
                            }
                          }}
                        >
                          Assign
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        {availability ? "available" : "not available"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {onGoingAssignment && (
        <div className="flex px-36 py-16 inset-0 justify-center">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Request Id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mistri Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mistri Phone Number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {onGoingReqs?.length > 0 &&
                  onGoingReqs.map((reqs) => (
                    <tr
                      key={reqs.reqId}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {reqs.reqId}
                      </th>
                      <td className="py-4 px-6">{reqs.mName}</td>
                      <td className="py-4 px-6">{reqs.mPhone}</td>
                      <td className="py-4 px-6">
                        {workDone ? "Completed" : "On Going"}
                      </td>

                      <td className="py-4 px-6">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 rounded-md"
                          onClick={(e) => {
                            setworkDone(true);
                            completedReqId = `${reqs.reqId}`;
                            completedMName = `${reqs.mName}`;
                            completedMPhone = `${reqs.mPhone}`;
                            status = "completed";
                            addCompletedRequests();
                          }}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default adminDashboard;

export async function getStaticProps() {
  const hireReqs = await sanityClient.fetch(hireReqQ);
  const services = await sanityClient.fetch(allServices);
  const allMistries = await sanityClient.fetch(mistriQ);
  const mistris = await sanityClient.fetch(allMistri)
  const onGoingReqs = await sanityClient.fetch(onGoingReqsQ);
  const hireReqs2 = await sanityClient.fetch(hireReqQ2);
  return {
    props: {
      hireReqs,
      services,
      allMistries,
      onGoingReqs,
      hireReqs2,
      mistris
    },
  };
}
