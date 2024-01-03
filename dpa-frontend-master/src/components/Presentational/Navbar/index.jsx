import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DASHBOARD,
  CONFIGS,
  USERS,
  PRODUCTS,
  AWARDS,
  TRANSACTIONS,
  DISTRIBUTIONS,
  BRANCHES,
  RATINGS,
  REPORTS,
  BANNERS,
  ROLES,
  ACCESS_CONTROL,
  ADVERTISINGMATERIALS,
} from "./constants";
import { useAuth } from "@/contexts/Authentication";
import LOGO from "@/assets/images/logo-white.png";
import EXECUTA_TRADE from "./executa-trade.png";

const Navbar = ({ toogleButton }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [toggle, setToggle] = useState(false);
  const {
    user: { permissions },
  } = useAuth();

  const listMenu = () => {
    let menu = [DASHBOARD];

    if (permissions.includes("menu-admin-users")) {
      menu.push(USERS);
    }

    if (permissions.includes("access-control-read")) {
      menu.push(ACCESS_CONTROL);
    }

    if (permissions.includes("roles-read")) {
      menu.push(ROLES);
    }

    if (permissions.includes("menu-admin-configs")) {
      menu.push(CONFIGS);
    }

    if (permissions.includes("menu-admin-products")) {
      menu.push(PRODUCTS);
    }

    if (permissions.includes("menu-admin-awards")) {
      menu.push(AWARDS);
    }

    if (permissions.includes("menu-admin-distributors")) {
      menu.push(DISTRIBUTIONS);
    }

    if (permissions.includes("menu-admin-company-branches")) {
      menu.push(BRANCHES);
    }

    if (permissions.includes("menu-admin-clusters")) {
      menu.push(RATINGS);
    }

    if (permissions.includes("menu-admin-reports")) {
      menu.push(REPORTS);
    }

    if (permissions.includes("menu-admin-banners")) {
      menu.push(BANNERS);
    }

    menu.push(ADVERTISINGMATERIALS);

    menu.push(TRANSACTIONS);

    return menu.map((row, key) => (
      <li
        key={key}
        className={`nav-item ${
          location.pathname === row.pathname ? "active" : ""
        }`}
      >
        <a
          className={`nav-link ${
            location.pathname === row.pathname ? "collapsed" : ""
          }`}
          href="/#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
          onClick={() => navigate(row.pathname)}
        >
          <i className={`fas fa-fw fa-${row.icon}`} />
          <span>{row.title}</span>
        </a>
      </li>
    ));
  };

  useEffect(() => {
    setToggle(toogleButton);
  }, [toogleButton]);

  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
        toggle ? "toggled" : ""
      }`}
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/home"
        style={{ marginBottom: 50, marginTop: 40 }}
      >
        <div className="sidebar-brand-icon">
          <img src={LOGO} alt="logo" className="img-fluid" />
        </div>
      </a>
      <li className={`nav-item`}>
        <a className={`nav-link`} href="/home">
          <i className={`fas fa-fw fa-home`} />
          <span>Home</span>
        </a>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Interface</div>
      {listMenu()}
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => setToggle(!toggle)}
        />
      </div>

      <div className="text-center d-none d-md-inline">
        <img
          src={EXECUTA_TRADE}
          alt=""
          width="230"
          height="150"
          className="img-fluid"
        />
      </div>
    </ul>
  );
};

export default Navbar;
