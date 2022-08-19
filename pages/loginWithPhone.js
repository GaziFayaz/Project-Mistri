import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";

const loginWithPhone = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const countryCode = "+88";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userMsg, setUserMsg] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [phn, setPhn] = useState("");
  const [expand, setExpand] = useState(false);
  const [otp, setOtp] = useState("");

  const capthaPopup = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const handleOnChangePhone = (e) => {
    setUserMsg(""); // deletes user message if starts typing again
    // console.log("event", e);
    const phn = e.target.value;
    setPhn(phn);
  };

  const handleLoginWithPhone = (e) => {
    e.preventDefault();
    const phnPattern = /^[0][1][^0124][0-9]*$/g;
    if (countryCode.concat(phn).length === 14 && phnPattern.test(phn)) {
      setExpand(true);
      capthaPopup();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = countryCode.concat(phn);
      console.log(phoneNumber);
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log(error);
        });
    } else {
      setUserMsg("Enter a valid Number");
    }
  };

  const verifyOTP = (e) => {
    // e.preventDefault();
    const OTP = e.target.value;
    setOtp(OTP);
    console.log(OTP);
    if (OTP.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(OTP)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          sessionStorage.setItem("Token", user.accessToken);

          console.log(user);

          router.push("/");

          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }

    console.log(otp);
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
              value={phn}
              id="phn"
              name="phnNumber"
              type="Number"
              autoComplete="phoneNumber"
              onChange={handleOnChangePhone}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              placeholder="Phone Number"
            />
            <p id="userMsg" className="font-poppins font-bold p-2">
              {userMsg}
            </p>
            <button
              type="submit"
              onClick={handleLoginWithPhone}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-900 group-hover:text-black"
                  aria-hidden="true"
                />
              </span>
              {/* {isLoading ? "Loading..." : "Sign In"}
               */}
              Request OTP
            </button>
            {expand === true ? (
              <div>
                <input
                  type="number"
                  id="otpInput"
                  value={otp}
                  onChange={verifyOTP}
                  className="appearance-none relative block w-full px-3 py-2 border
               border-gray-300 placeholder-gray-500 text-gray-900 rounded-md
                focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm mt-2"
                  placeholder={`OTP sent to ${phn}`}
                />
              </div>
            ) : null}

            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginWithPhone;
