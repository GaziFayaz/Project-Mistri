import React, { useEffect } from "react";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { magic } from "../lib/magic-client";
import { sanityClient } from "../lib/Sanity";

const userQuery = `*[_type == "users"]{ email }.email`;

export default function loginWithEmail({ users }) {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  const addUser = async (imageUrl) => {
    try {
      {
        const Body = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          address: address,
          dateOfBirth: dateOfBirth,
          photo: imageUrl,
        };
        const result = await fetch(`/api/addUser`, {
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

  const authenticate = async () => {
    try {
      // when clicked on the sign in button turn the show "loading..."
      setIsLoading(true);
      const didToken = await magic.auth.loginWithMagicLink({ email });
      console.log({ didToken });
      if (didToken) {
        // route to home
        return true;
      } else {
        setUserMsg("Error! Could not Log in");
        return false;
      }
    } catch (error) {
      // in case of error
      console.error("Something went wrong logging in", error);
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg(""); // deletes user message if starts typing again
    setIsNewUser(false);
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
        if (await authenticate()) {
          router.push("/");
        }
      } else {
        setIsNewUser(true);
        setUserMsg("You are not signed up yet. Please Fill up and Register");
      }
    } else {
      // show userMsg
      setUserMsg("Enter a valid email address");
    }
  };

  const handleLoginWithEmailNewUser = async (e) => {
    e.preventDefault();
    console.log("Button for new user!");
    const form = e.currentTarget;
    console.log(form);

    try {
      const form = e.currentTarget;
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
      const imageUrl = data.secure_url
      console.log(imageUrl);
      if (await authenticate()) {
        if (await addUser(imageUrl)) router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-homebg min-h-screen min-w-screen">
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
              <form
                className="form pt- space-y-4 mb-5"
                onSubmit={handleLoginWithEmailNewUser}
              >
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
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-green-900 group-hover:text-black"
                      aria-hidden="true"
                    />
                  </span>
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </form>
            )}
            {!isNewUser && (
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
                </span>
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            )}
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
