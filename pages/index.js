import React from "react";
import Home from "../views/Home";

const Index = () => {
  return <Home />;
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

export default Index;
