import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { sanityClient } from "../lib/Sanity";
let query = ``;
// const userMail = { currUserMail }?.currUserMail

// query = `*[_type == "users" && email == "${
    
//   }"]{_id, address, first_name, phone_number}[0]`;

const multiSelect = () => {
  const [currUserMail, setcurrUserMail] = useState("");

  useEffect(() => {
    async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          console.log({ email });
          setcurrUserMail(email);
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Error retrieving email, error");
      }
    };
  }, []);

  return <div>multiSelect</div>;
};
// export async function getStaticProps() {
//   const users = await sanityClient.fetch(query);
//   // const user = await users.json();
//   console.log(users);
// }

export default multiSelect;
