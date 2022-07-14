import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Header from "./components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="font-poppins">
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
