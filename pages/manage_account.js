import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";

const manage_account = () => {
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
