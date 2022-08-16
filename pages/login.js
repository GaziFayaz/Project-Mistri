import React, { useEffect } from "react";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { magic } from "../lib/magic-client";
import { sanityClient } from "../lib/Sanity";

const userQuery = `*[_type == "user1"]{ email}.email`;

export default function login({ users }) {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

      // if (email !== user) {

      // }
    } else {
      // show userMsg
      setUserMsg("Enter a valid email address");
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
              {isLoading ? "Loading..." : "Sign In"}
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
