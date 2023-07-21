import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "./EmailSignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./EmailSignUp.css"

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/startreading", { email });
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
    setLoading(false);
  };
  return (
    <div className="email-signin-container">
      {loading ? (
        <div className="bg-white w-[100vw] h-[100vh] flex justify-center items-center">
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            class="wheel-and-hamster"
          >
            <div class="wheel"></div>
            <div class="hamster">
              <div class="hamster__body">
                <div class="hamster__head">
                  <div class="hamster__ear"></div>
                  <div class="hamster__eye"></div>
                  <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
              </div>
            </div>
            <div class="spoke"></div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default EmailSignIn;
