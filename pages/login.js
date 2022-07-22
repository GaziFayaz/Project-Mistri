import React, { useEffect } from "react";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { magic } from "../lib/magic-client";

export default function login() {
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
      if (
        email === "gazifayaz.16694@gmail.com" ||
        email === "haidersakib20@gmail.com"
      ) {
        // log in a user by their email
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
      } else {
        // User message in case unable to verify email
        setUserMsg("Something went wrong logging in");
      }
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
