import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./EmailSignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/startreading" ,{email});
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };
  return (
    <div className="email-signin-container">
      <div className="email-signin-text">Sign in with email</div>
      <form>
        <div className="email-inputs-container">
          <p>Your Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="email-inputs-container">
          <p>Your Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="email-continue-btn"
          onClick={handleSignIn}
        >
          Continue
        </button>
      </form>
      <div className="signin-with-other-options-container">
        <MdOutlineKeyboardArrowLeft color="#25ae20" />
        <Link to="/signin" className="email-goback-text">
          All sign in options
        </Link>
      </div>
    </div>
  );
};

export default EmailSignIn;
