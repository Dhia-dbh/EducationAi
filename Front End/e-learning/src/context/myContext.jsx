import React, { createContext, useState, useContext } from "react";
import { files as filess } from "../files.json";
// Create the context
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [files, setFiles] = useState(filess);

  return (
    <MyContext.Provider value={[files, setFiles]}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
