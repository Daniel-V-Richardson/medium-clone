import React from "react";
import "./SigninPage.css";
import { Link } from "react-router-dom";
import GoogleLogo from "../assets/img/google-logo.png";
import FacebookLogo from "../assets/img/facebook-logo.png";
import EmailLogo from "../assets/img/email-logo.png";
import GithubLogo from "../assets/img/github-logo.png";
import MediumGif from "../assets/img/medium.gif";

const SigninPage = () => {
  

  return (
    <div className="joinmedium-container">
      <p>
        Welcome Back
        <img className="medium-gif" src={MediumGif} alt="" />
      </p>
      <div className="joinmedium-btn-container">
        <Link to="/" className="joinmedium-button">
          <img src={GoogleLogo} alt="Google" />
          <p>Sign in with Google</p>
        </Link>
        <Link to="/" className="joinmedium-button">
          <img src={FacebookLogo} alt="Facebookj" />
          <p>Sign in with Facebook</p>
        </Link>
        <Link to="/email-signin" className="joinmedium-button">
          <img src={EmailLogo} alt="Email" />
          <p>Sign in with email</p>
        </Link>
        <Link to="/" className="joinmedium-button">
          <img src={GithubLogo} alt="Github" />
          <p>Sign in with Github</p>
        </Link>
      </div>
      <div className="already-have-an-account-container">
        <p>No Account? </p>
        <Link to="/getstarted" className="signin-link">
          Create one
        </Link>
      </div>
      <div className="joinmedium-bottom-text">
        Click “Sign In” to agree to Medium’s Terms of Service and acknowledge
        that Medium’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default SigninPage;
