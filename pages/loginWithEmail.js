import React, { useEffect } from "react";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { magic } from "../lib/magic-client";
import { sanityClient } from "../lib/Sanity";

const userQuery = `*[_type == "user1"]{ email}.email`;

export default function loginWithEmail({ users }) {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [image, setImage] = useState();

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      // Turn "Loading..." back into "sign in" when routing is complete
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routerChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  // add the user to the sanity database

  const addUser = async () => {
    const emailBody = {
      email: email,
    };
    const result = await fetch(`/api/addUser`, {
      body: JSON.stringify(emailBody),
      method: "POST",
    });
    const json = await result.json();
    console.log(emailBody);
    return json;
  };

  const authenticate = async () => {
    try {
      // when clicked on the sign in button turn the show "loading..."
      setIsLoading(true);
      const didToken = await magic.auth.loginWithMagicLink({ email });
      console.log({ didToken });
      if (didToken) {
        // route to home
        router.push("/");
      }
    } catch (error) {
      // in case of error
      console.error("Something went wrong logging in", error);
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg(""); // deletes user message if starts typing again
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    console.log("hi button");

    if (email) {
      const flag = 0;
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        // console.log(user);
        if (email === user) {
          flag++;
        }
      }
      if (flag > 0) {
        authenticate();
      } else {
        setUserMsg("You are not signed up yet. Preparing for signing up... ");
        addUser();
        authenticate();
      }
    } else {
      // show userMsg
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className="bg-homebg min-h-screen ">
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
              value={email}
              id="email-address"
              name="email"
              type="text"
              autoComplete="email"
              required
              onChange={handleOnChangeEmail}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            <p id="userMsg" className="font-poppins font-bold p-2">
              {userMsg}
            </p>
            {isNewUser && (
              <form className="form pt- space-y-4 mb-5">
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
                {/* <input
                  placeholder="Email-[Required]"
                  type="Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(email);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                /> */}
                <input
                  placeholder="Phone Number-[Required]"
                  type="Number"
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
                  onChange={(e) => {
                    setAddress(e.target.value);
                    console.log(address);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
                <input
                  placeholder="Date of Birth"
                  type="Date"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    console.log(dateOfBirth);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
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
                  {image && <img src={image} height={200} width={200} />}
                </div>
              </form>
            )}
            <button
              type="submit"
              onClick={handleLoginWithEmail}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-900 group-hover:text-black"
                  aria-hidden="true"
                />
              </span>{
                if(isLoading) {
                "Loading..."
              }  else{
                if(isRegistration){
                  "Registration"
                }
                else{
                  "Sign In"
                }
              }
              }
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const users = await sanityClient.fetch(userQuery);
  return {
    props: { users },
  };
}
