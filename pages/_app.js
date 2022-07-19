import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Header from "./components/Header";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <div className="font-poppins">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
