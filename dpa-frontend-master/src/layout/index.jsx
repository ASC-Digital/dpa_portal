import React, { useState } from "react";
import Navbar from "@/components/Presentational/Navbar";
import Header from "@/components/Presentational/Header";
import Footer from "@/components/Presentational/Footer";

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div id="wrapper">
      <Navbar toogleButton={toggle} />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header onClick={() => setToggle(!toggle)} />
          <div className="container-fluid">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
