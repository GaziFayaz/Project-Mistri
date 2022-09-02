import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { auth } from "../firebase";
import { sanityClient } from "../lib/Sanity";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";

const userQuery = `*[_type == "users"]{ phone_number }.phone_number`;

const loginWithPhone = ({ users }) => {
  const router = useRouter();
  const countryCode = "+88";

  const [userMsg, setUserMsg] = useState("");
  const [phn, setPhn] = useState("");
  const [isNewUser, setIsNewUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [image, setImage] = useState();

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
          phone_number: phn,
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

  const verifyOTP = (e) => {
    // e.preventDefault();
    const OTP = e.target.value;
    setOtp(OTP);
    console.log(OTP);
    if (OTP.length === 6) {
      const telNumber = countryCode.concat(phn);
      const flag = 0;
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        // console.log(user);
        if (phn === user) {
          flag++;
        }
      }
      if (flag > 0) {
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
            alert(error);
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
      } else {
        
        setExpand(false);
        setUserMsg("You are not signed up yet. Please fill up and register");
        let confirmationResult = window.confirmationResult;
        confirmationResult
          .confirm(OTP)
          .then((result) => {
            // User signed in successfully.
            setIsNewUser(true);
            const user = result.user;
            sessionStorage.setItem("Token", user.accessToken);
            console.log(user);
          })
          .catch((error) => {
            alert(error);
            setUserMsg(""); // deletes user message if error occurs
    setIsNewUser(false);
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
      }
    }

    console.log(otp);
  };

  const handleOnChangePhone = (e) => {
    setUserMsg(""); // deletes user message if starts typing again
    setIsNewUser(false);
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

  const handleLoginWithPhoneNewUser = async (e) => {
    e.preventDefault();
    console.log("Button for new user!");
    // const form = e.currentTarget;
    // console.log(form);

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
      const imageUrl = data.secure_url;
      console.log(imageUrl);
      if (await addUser(imageUrl)) {
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
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
            {isNewUser && (
              <form
                className="form pt- space-y-4 mb-5"
                onSubmit={handleLoginWithPhoneNewUser}
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
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(email);
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                  placeholder="Email address"
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
                onClick={handleLoginWithPhone}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-900 group-hover:text-black"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? "Loading..." : "Request OTP"}
              </button>
            )}
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

export async function getStaticProps() {
  const users = await sanityClient.fetch(userQuery);
  return {
    props: { users },
  };
}
