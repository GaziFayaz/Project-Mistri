import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

const addServices = () => {
  const router = useRouter();
  const [service, setService] = useState("");
  const handleOnchage = (e) => {
    const ser = e.target.value;
    console.log(ser);
    setService(ser);
  };
  const addService = async () => {
    const Body = {
      service: service,
    };
    const result = await fetch(`/api/services`, {
      body: JSON.stringify(Body),
      method: "POST",
    });
    const json = await result.json();
    console.log(Body);
    return json;
  };

  // const addService = async () => {
  //   const newForm = {
  //     services: service,
  //   };
  //   console.log(newForm);
  //   await axios.post("http://localhost:3000/api/addServicesapi", newForm);
  // };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    
    try{
      const newService = {
      services: service,
    };
    console.log(newService);
    await axios.post("http://localhost:3000/api/addServicesapi", newService);
    }catch(error){
      console.log("error",error)
    }
  };

  return (
    <div>
      <form onSubmit={handleOnsubmit} method="post">
        <div className="mb-6">
          <input
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required=""
            onChange={handleOnchage}
            value={service}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default addServices;
