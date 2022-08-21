import React, { useContext } from "react";
import Home from "../views/Home";
import Button from "../components/elements/Button";
import { CMSContext } from "../context";

const NavBar = () => {
  const CMS = useContext(CMSContext);
  return (
    <nav className="header-nav">
      <Button
        tag="a"
        color="primary"
        wideMobile
        onClick={() => CMS?.saveContentToCMS()}
      >
        LGTM
      </Button>
    </nav>
  );
};

const Staging = () => {
  return (
    <>
      <NavBar />
      <Home />
    </>
  );
};

const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_KEY,
});

export async function getServerSideProps(context) {
  const entry = await client.getEntry(process.env.CONTENTFUL_ENTRY);
  return { props: { entry } };
}
export default Staging;
