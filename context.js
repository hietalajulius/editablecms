import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

const contentfulManagement = require("contentful-management");
const managementClient = contentfulManagement.createClient({
  accessToken: process.env.contentfulManagementKey,
});

export const CMSContext = React.createContext();

export const CMSContextProvider = ({ initialContent, children }) => {
  const [content, setContent] = useState(initialContent);
  const router = useRouter();

  const contentEditable = router.asPath === "/staging";

  const onContentChange = async (key, text) => {
    if (text.includes("auto:")) {
      const textWithoutAuto = text.replace(/auto:/, "");
      fetch("api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textWithoutAuto }),
      })
        .then((res) => res.json())
        .then((data) => {
          setContent({
            ...content,
            fields: { ...content.fields, [key]: data.text },
          });
        });
    } else {
      setContent({ ...content, fields: { ...content.fields, [key]: text } });
    }
  };

  const saveContentToCMS = async () => {
    managementClient.getSpace(process.env.contentfulSpace).then((space) => {
      space.getEnvironment("master").then((environment) => {
        environment.getEntries().then((entries) => {
          Object.entries(content.fields).forEach((field) => {
            Object.assign(entries.items[0].fields, {
              [field[0]]: { "en-US": field[1] },
            });
          });

          entries.items[0].update().then((result) => {
            console.log("Updated entry");
            result.publish().then((result) => {
              console.log("Published entry");
            });
          });
        });
      });
    });
  };

  return (
    <CMSContext.Provider
      value={{ content, contentEditable, onContentChange, saveContentToCMS }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const CMSText = ({ CMSKey, CMSIdx }) => {
  const CMS = useContext(CMSContext);
  const onTextChange = (e) => {
    if (CMS?.contentEditable) {
      CMS?.onContentChange(CMSKey, e.currentTarget.textContent);
    }
  };

  if (CMSIdx !== undefined) {
    return (
      <span
        contentEditable={CMS?.contentEditable}
        onBlur={(e) => onTextChange(e)}
      >
        {CMS?.content?.fields[`${CMSKey}`][CMSIdx]}
      </span>
    );
  } else {
    return (
      <span
        contentEditable={CMS?.contentEditable}
        onBlur={(e) => onTextChange(e)}
      >
        {CMS?.content?.fields[`${CMSKey}`]}
      </span>
    );
  }
};
