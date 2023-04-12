import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";

const Navbarre = () => {
  return (
    <div className="navbar">
      <div className="navbar_href">
        <NavLink to="/" className="navlk">
          Home
        </NavLink>
        <NavLink to="/Contact" className="navlk">
          Contacts
        </NavLink>
        {/* <NavLink to="/SignUpPage" className="navlk">
          Sign_UP
        </NavLink> */}
       
      </div>
    </div>
  );
};

export default Navbarre;
