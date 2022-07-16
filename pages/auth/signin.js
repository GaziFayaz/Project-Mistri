import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
      >
        {(formik) => (
          <>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div
                  className=" bg-homebg flex flex-col items-center 
            justify-center min-h-screen py-2 shadow-lg"
                >
                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="text-red-400 text-md text-center rounded p-2">
                      {error}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Email
                        <Field
                          name="email"
                          aria-label="enter your email"
                          aria-required="true"
                          type="text"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                        />
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className=" bg-emerald-400 hover:bg-emerald-600 text-gray-100 p-3 rounded-lg w-full"
                      >
                        {formik.isSubmitting ? "Please wait..." : "Sign In"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </Formik>
    </>
  );
}

export async function getServerSideProps(context) {
  //   const provider = await getProviders();

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
