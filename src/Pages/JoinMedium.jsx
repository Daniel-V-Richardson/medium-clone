import React from "react";
import { Link } from "react-router-dom";
import GoogleLogo from "../assets/img/google-logo.png";
import FacebookLogo from "../assets/img/facebook-logo.png";
import EmailLogo from "../assets/img/email-logo.png";
import GithubLogo from "../assets/img/github-logo.png";
import "./JoinMedium.css";
import MediumGif from "../assets/img/medium.gif"

const JoinMedium = () => {
  return (
    <div className="joinmedium-container">
      <p className="join-text">
        Join Medium
        {/* <img className="medium-gif" src={MediumGif} alt="" /> */}
      </p>
      <div className="joinmedium-btn-container">
        <Link to="/" className="joinmedium-button">
          <img src={GoogleLogo} alt="Google" />
          <p>Sign up with Google</p>
        </Link>
        <Link to="/" className="joinmedium-button">
          <img src={FacebookLogo} alt="Google" />
          <p>Sign up with Facebook</p>
        </Link>
        <Link to="/email-signup" className="joinmedium-button">
          <img src={EmailLogo} alt="Google" />
          <p>Sign up with email</p>
        </Link>
        <Link to="/" className="joinmedium-button">
          <img src={GithubLogo} alt="Google" />
          <p>Sign up with Github</p>
        </Link>
      </div>
      <div className="already-have-an-account-container">
        <p>Already have an account? </p>
        <Link to="/signin" className="signin-link">
          Sign in
        </Link>
      </div>
      <div className="joinmedium-bottom-text">
        Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge
        that Medium’s Privacy Policy applies to you.
      </div>
    </div>
  );
};

export default JoinMedium;
