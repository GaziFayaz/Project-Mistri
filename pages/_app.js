import "../styles/globals.css";
import Header from "./components/Header";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <div className="font-poppins">
      {/* <Header /> */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
