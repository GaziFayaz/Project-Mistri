import { ChevronDownIcon } from "@heroicons/react/outline";
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { magic } from "../lib/magic-client";
import { sanityClient } from "../lib/Sanity";

const mistriDashboard = () => {
  const [showCurrentWorks, setShowCurrentWorks] = useState();
  const [showHistory, setShowHistory] = useState();
  const [showProfile, setShowProfile] = useState();

  return (
    <div className="bg-homebg inset-0 flex">
      <div className=" w-64 py-4 px-3 min-h-screen bg-header rounded-b-xl dark:bg-gray-800  ">
        <ul className="space-y-2">
          <li
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={(e) => {
              setShowCurrentWorks(true);
              setShowHistory(false);
              setShowProfile(false);
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
            <span className="ml-3 font-bold">Current Jobs</span>
          </li>
          <li
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={(e) => {
              setShowCurrentWorks(false);
              setShowHistory(true);
              setShowProfile(false);
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
            <span className="ml-3 whitespace-nowrap font-bold">Work History</span>
          </li>
          <li
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={(e) => {
              setShowCurrentWorks(false);
              setShowHistory(false);
              setShowProfile(true);
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
              Profile
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
              // onClick={logOut}
            >
              Log Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default mistriDashboard;
