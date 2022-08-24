import React, { useRef } from "react";
import mistrilogo from "../public/mistri_logo_svg.svg";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { sanityClient } from "../lib/Sanity";
import { useRouter } from "next/router";
const userQuery = `*[_type == "adminInfo"]{email, password}`;

const adminLogin = ({ users }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    if (email && password) {
      for (let index = 0; index < users.length; index++) {
        const umail = users[index].email;
        const upass = users[index].password;
        console.log(umail);
        console.log(upass);
        if (email === umail) {
          bcrypt.compare(password, upass, function (err, isMatch) {
            if (err) {
              throw err;
            } else if (!isMatch) {
              setUserMsg("Incorrect Email Or Password");
            } else if (isMatch) {
              setIsLoading(true);
              router.push("/adminDashboard");
            }
          });
        } else {
          setUserMsg("Incorrect Email Or Password");
        }
      }
    } else {
      setUserMsg("Fill in The Email and Password Field");
    }
  };
  return (
    <div className="bg-homebg h-screen ">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div className="flex-">
            <Image src={mistrilogo} height={350} width={1000} className="" />

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>

          <div>
            <input
              ref={emailInputRef}
              id="email-address"
              name="email"
              type="text"
              autoComplete="email"
              required
              className=" my-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />

            <input
              ref={passInputRef}
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <p id="userMsg" className="font-poppins font-bold p-2">
              {userMsg}
            </p>
            <button
              onClick={onSubmitHandler}
              type="submit"
              className=" my-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-900 group-hover:text-black"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Loading..." : "Sign In"}

              {/* Sing in */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminLogin;

export async function getStaticProps() {
  const users = await sanityClient.fetch(userQuery);
  return {
    props: { users },
  };
}
