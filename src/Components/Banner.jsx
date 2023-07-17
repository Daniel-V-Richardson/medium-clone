import React, { useEffect, useState } from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";

const Banner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
  });

    return () => unsubscribe();
  }, []);

  return (
    <div className="banner-container">
      <div className="banner-left-container">
        <h1>Stay Curious.</h1>
        <p>
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Link to={isLoggedIn ?"/startreading":"/getstarted"} className="start-reading-btn">
          Start Reading
        </Link>
      </div>
      <div className="banner-right-container">
        <img
          src="https://res.cloudinary.com/imagniecloudstorage/image/upload/v1663468224/richard_ua6qy1.svg"
          alt="banner logo"
        />
      </div>
    </div>
  );
};

export default Banner;
