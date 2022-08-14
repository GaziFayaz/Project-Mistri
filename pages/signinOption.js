import React from "react";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import Router, { useRouter } from "next/router";

const signinOption = () => {
  const router = useRouter();
  const loginWithEmail = (e) => {
    e.preventDefault();
    router.push("/loginWithEmail");
  };

  const loginWithPhone = (e) => {
    e.preventDefault();
    router.push("/loginWithPhone");
  };

  return (
    <div className=" bg-homebg w-screen h-screen flex justify-center items-center">
      <form className=" bg-slate-200 p-10 rounded-xl drop-shadow-lg space-y-5 flex flex-col">
        <Image src={mistrilogo} height={100} width={100} className="" />

        <button
          className="w-full px-10 py-2 border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
          type="submit"
          onClick={loginWithEmail}
        >
          Sign In With Email
        </button>

        <button
          className="w-full px-10 py-2 border-transparent text-sm font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
          type="submit"
          onClick={loginWithPhone}
        >
          Sign In With Phone Number
        </button>
      </form>
    </div>
  );
};

export default signinOption;
