import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userData }) => {
  const navigate = useNavigate();

  function Logout() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="links-container">
        <Link to="/our-story" className="nav-links">
          Our Story
        </Link>
        <Link to="/membership" className="nav-links">
          Membership
        </Link>
        <Link to="/write" className="nav-links">
          Write
        </Link>
        {userData ? (
          <Link to="/signin" className="get-started-link">
            Welcome, {userData.email}
          </Link>
        ) : (
          <Link to="/signin" className="nav-links">
            Sign in
          </Link>
        )}
        {userData ? (
          <Link onClick={Logout} className="nav-links">
            Logout
          </Link>
        ) : (
          <Link to="/getstarted" className="get-started-link">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
