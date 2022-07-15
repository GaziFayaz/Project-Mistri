import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  // return (

 
  // );
}

export async function getServerSideProps(context) {
  //   const provider = await getProviders();

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
