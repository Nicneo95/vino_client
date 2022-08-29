import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <React.Fragment>
      <div className="logo">
        <Link to="/" className="navbar-brand">
          <img
            src={require("../assets/images/logo-header.png")}
            style={{ height: "30px", width: "150px" }}
            alt="Brand Logo"
          />
        </Link>
      </div>  
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* center links */}
            <ul className="navbar-nav ms-auto">
              <span className="alignment">
                <li className="nav-item">
                  <Link to="/" className="nav-link active nav-align">
                    Home
                  </Link>
                </li>
              </span>
              <li className="nav-item">
                <Link to="/about" className="nav-link active">
                  About Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link to="/collection" className="nav-link active">
                  Our Wines
                </Link>
              </li>
            </ul>
            {/* center links */}
            {/* right links */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/account/login" className="nav-link active">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link active">
                  Cart
                </Link>
              </li>
            </ul>
            {/* right links */}
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </React.Fragment>
  );
}
