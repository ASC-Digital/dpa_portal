import React, { createContext, useContext, useState } from "react";
import Loader from "@/components/Presentational/Loader";
export const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {loader ? <Loader /> : ""}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
