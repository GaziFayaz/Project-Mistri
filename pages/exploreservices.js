import Image from "next/image";
import React, { useState } from "react";
import { magic } from "../lib/magic-client";
// import Search from "./Search";
import { sanityClient } from "../lib/Sanity";
import Header from "./components/Header";
import car from "../public/carpenter.jpg";
import me from "../public/me.jpg";
import mistrilogo from "../public/mistri_logo_svg.svg";
import painter from "../public/painter.jpg";
import vercel from "../public/vercel.svg";
import Modal from "./components/Modal";
import { useRouter } from "next/router";
// import serviceQ from "/pages/Search";

const servicesQ = `*[_type == "services"]{name, _id, image}`;
const currUser = `*[_type == "currUser"]{user} `;
//

let i = 0;
let reqService = "";
let didToken;
let token;
let userMail = "";

const exploreservices = ({ services, users, cId, cAddress, cName, cphone }) => {
  // const [currUserMail, setcurrUserMail] = useState("");
  console.log(cId, cAddress, cName, cphone);
  const router = useRouter();

  const isAuthorized = async () => {
    try {
      token = sessionStorage.getItem("Token");
      didToken = await magic.user.isLoggedIn();

      if (!didToken && !token) {
        alert("To make a hire Request, you must be logged in");
        router.push("/signinOption");
      } else if (didToken) {
        const { email } = await magic.user.getMetadata();
        if (email) {
          console.log("inside email in authortized");
          const mail = { email }.email;
          // localStorage.setItem("userMail", mail);
          userMail = mail;
          // userMail = { email };
          console.log("userMail in explore : " + userMail);
          // setcurrUserMail(userMail);
          // console.log("currusermail in authorized: " + currUserMail);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addRequest = async () => {
    try {
      {
        const Body = {
          name: reqService,
          description: desc,
          cId: cId,
          cName: cName,
          cphone: cphone,
          cAddress: cAddress,
        };
        const result = await fetch(`/api/hireRequest`, {
          body: JSON.stringify(Body),
          method: "POST",
        });
        const json = await result.json();
        console.log(Body);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const [desc, setDesc] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOnSubmit = (e) => {
    addRequest();
    handleCloseModal();
  };
  return (
    <>
      <div className="bg-homebg min-h-screen">
        <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-3">
          {services?.length > 0 &&
            services.map((service) => (
              <div
                key={service._id}
                className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
              >
                <div>
                  <img
                    layout="responsive"
                    src={service.image}
                    height="500"
                    width="700"
                    className="rounded-t-lg h-96"
                  />
                  <div className="bg-header rounded-b-lg">
                    <button className="cursor-pointer p-4 border-2 py-1 text-center font-bold rounded-full border-black hover:border-white hover:text-white">
                      <h2
                        className="text-2xl text-black transition-all duration-100 ease-in-out group-hover:font-bold"
                        onClick={(e) => {
                          // e.preventDefault();
                          isAuthorized();
                          reqService = `${service.name}`;
                          setOpenModal(true);
                          // console.log("on hire press: " + currUserMail);
                        }}
                      >
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
        {/* <Modal
          visible={openModal}
          hireRequest={reqService}
          onClose={handleCloseModal}
          // currUserMail={currUserMail}
        /> */}
        {openModal && (
          <div
            id="container"
            // onClick={handleOnCLose}
            className="fixed inset-0 bg-black bg-opacity-30 backdropbackdrop-blur-sm flex justify-center items-center rounded-lg border shadow-md dark:border-gray-700 "
          >
            <div className=" bg-slate-400 py-16 px-4 rounded w-96 min-w-2xl">
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Requested service
                </label>
                <input
                  type="text"
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={reqService}
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Specific Description of the Mistri
                </label>
                <textarea
                  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows="5"
                  onChange={(e) => {
                    setDesc(e.target.value);
                    console.log(desc);
                  }}
                  value={desc}
                />
              </div>
              <div className="text-center pt-4 ">
                <button
                  onClick={handleOnSubmit}
                  className="px-5 py-2 m-2 bg-green-400 hover:bg-header text-white rounded"
                >
                  Request Mistri
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 bg-green-400 hover:bg-header text-white  rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const serImage = [];

  const services = await sanityClient.fetch(servicesQ);
  const nowUser = await sanityClient.fetch(currUser);
  console.log(nowUser[0]);
  const currentUser = nowUser[nowUser.length - 1].user;
  console.log(currentUser);
  const users = await sanityClient.fetch(
    `*[_type == "users" && (phone_number == "${currentUser}")]{_id, address, first_name, phone_number}[0]`
  );
  console.log(users);
  for (let index = 0; index < services.length; index++) {
    const element = services[index].image;
    serImage.push(element);
  }
  // console.log(serImage);
  return {
    props: {
      services,
      cId: users._id,
      cAddress: users.address,
      cName: users.first_name,
      cphone: users.phone_number,
    },
  };
}

export default exploreservices;
