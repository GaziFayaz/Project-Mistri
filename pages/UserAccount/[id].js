import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useRouter } from "next/router";
// import { didToken } from "./loginWithEmail";
import { magic } from "../../lib/magic-client";
const query = `*[_type == "users" && _id.current == $id][0]{email, first_name, last_name, phone_number, dateOfBirth, address }`;

const UserAccount = ({ email, fname, lname, phone, dob, address, image }) => {
  console.log(email, fname, lname, phone, dob, address, image);
  const router = useRouter();
  const authorization = async () => {
    // let token = window.sessionStorage.getItem("Token");
    try {
      const token = window.sessionStorage.getItem("Token");
      const didToken = await magic.user.isLoggedIn();

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

export const getServerSideProps = async (pageContext) => {
  const pageId = pageContext.query.id;
  console.log("this is the page id " + pageId);
  if (!pageId) {
    return {
      notFound: true,
    };
  }
  const userQuery = encodeURIComponent(
    `*[_type == "users" && _id == "${pageId}"]`
  );
  const url = `https://k4gt4798.api.sanity.io/v2021-10-21/data/query/production?query=${userQuery}`;

  const result = await fetch(url).then((res) => res.json());
  const user = result.result[0];

  if (!user) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        email: user.email,
        fname: user.first_name,
        lname: user.last_name,
        phone: user.phone_number,
        dob: user.dateOfBirth,
        address: user.address,
        image: user.photo,
      },
    };
  }
};

export default UserAccount;
