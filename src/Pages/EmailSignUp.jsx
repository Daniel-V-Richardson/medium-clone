import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

const EmailSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log(user);
        AddToFirebase(uid);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        alert(errorMessage);
      });
  };
  async function AddToFirebase(uid) {
    const newData = {
      email: email,
      pass: password,
    };
    const docRef = doc(collection(db, "Users"), uid);
    await setDoc(docRef, newData);
    // const documentId = docRef.id;
  }
  return (
    <div className="email-signin-container">
      <div className="email-signin-text">Sign up with email</div>
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
          onClick={handleSignup}
        >
          Continue
        </button>
      </form>
      <div className="signin-with-other-options-container">
        <MdOutlineKeyboardArrowLeft color="#25ae20" />
        <Link to="/getstarted" className="email-goback-text">
          All sign in options
        </Link>
      </div>
    </div>
  );
};

export default EmailSignUp;
