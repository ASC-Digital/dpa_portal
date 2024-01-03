import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Bowser from "bowser";
import { decode } from "@/utils/Crypto";

function PrivateRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isAuthorizated = async () => {
    try {
      const st = localStorage.getItem("st");
      const browserParse = Bowser.getParser(window.navigator.userAgent);
      const browser = browserParse.getBrowserName();
      const stDecode = decode(st);

      console.log("[token-decode]", stDecode);

      if (!(browser === stDecode.browser)) {
        localStorage.removeItem("st");
        setIsLoggedIn(false);
        return;
      }

      return;
    } catch (e) {
      setIsLoggedIn(false);
      return;
    }
  };

  useEffect(() => {
    isAuthorizated();
  }, []);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
