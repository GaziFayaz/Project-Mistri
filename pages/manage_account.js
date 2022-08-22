import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import { useRouter } from "next/router";
import { didToken } from "./loginWithEmail";

const manage_account = () => {
  const router = useRouter();
  const authorization = () => {
    // let token = window.sessionStorage.getItem("Token");
    try {
      const token = window.sessionStorage.getItem("Token");

      if (!didToken && !token) {
        alert("you are not logged in");
        router.push("/signinOption");
      }
    } catch (error) {
      console.log(error);
    }
  };
  authorization();
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className=" mt-16 md:mx-20 mx-1 ">
        <Card />
      </div>
    </div>
  );
};

export default manage_account;
