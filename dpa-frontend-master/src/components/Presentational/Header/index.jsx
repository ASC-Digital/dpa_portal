import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/Authentication";

const Header = ({ onClick }) => {
  const navigation = useNavigate();
  const { user, signOut } = useAuth();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [image, setImage] = useState(
    "https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png"
  );

  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setBalance(user.balance);
    }

    if (user.photoUrl) {
      setImage(user.photoUrl);
    }
  }, [user]);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={onClick}
      >
        <i className="fa fa-bars" />
      </button>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow mx-1">
          <span
            className={`badge ${
              balance > 0 ? "badge-success" : "badge-danger"
            } badge-counter`}
            style={{ fontSize: 15, marginTop: 25 }}
          >
            {balance}p
          </span>
        </li>

        <div className="topbar-divider d-none d-sm-block" />
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {name}
            </span>
            <img className="img-profile rounded-circle" src={image} alt="" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <button
              className="dropdown-item"
              onClick={() => navigation("/profile")}
            >
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Perfil
            </button>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href="/#"
              data-toggle="modal"
              data-target="#logoutModal"
              onClick={() => signOut()}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
