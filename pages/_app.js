import "../styles/globals.css";
import React from "react";
import "../assets/scss/style.scss";
import { CMSContextProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <CMSContextProvider initialContent={pageProps.entry}>
      <Component {...pageProps} />
    </CMSContextProvider>
  );
}

export default MyApp;
