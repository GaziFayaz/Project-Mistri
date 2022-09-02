import React, { useState } from "react";
import { magic } from "../../lib/magic-client";
import { sanityClient } from "../../lib/Sanity";
import { useEffect } from "react";

let didToken;
let token;
let userMail = "";

const Modal = ({ visible, hireRequest, onClose }) => {
  const [desc, setDesc] = useState("");
  if (!visible) {
    return null;
  }
  const addUser = async () => {
    try {
      {
        const Body = {
          name: hireRequest,
          description: desc,
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
  const handleOnSubmit = (e) => {
    addUser();
    onClose();
  };
  return (
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
            value={hireRequest}
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
            onClick={onClose}
            className="px-5 py-2 bg-green-400 hover:bg-header text-white  rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps() {
//   const userQ = `*[_type == "users" && email == "${userMail[0]}"]{_id, address, first_name, phone_number}[0]`;
//   const user = await sanityClient.fetch(userQ);
//   return {
//     props: {
//       // id: user._id,
//       // address: user.address,
//       // first_name: user.first_name,
//       user,
//     },
//   };
// }
export default Modal;
