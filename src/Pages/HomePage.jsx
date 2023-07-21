import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../Components/Navbar.jsx";
import Banner from "../Components/Banner.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import PostCard from "../Components/PostCard";
// import Spline from "@splinetool/react-spline";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user);
      } else {
        setUserData(null);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  function getUserData(user) {
    const uid = user.uid;
    const usersCollection = collection(db, "Users");
    const docRef = doc(usersCollection, uid);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUserData(userData);
        } else {
          alert("User data not found in Firestore");
        }
      })
      .catch((error) => {
        alert("Error getting user data from Firestore: " + error);
      });
  }

  return (
    <div className="home-container">
      <Navbar userData={userData} />
      <Banner />
      {/* <Spline  scene="https://prod.spline.design/WTl0uo3oqQuNt3pf/scene.splinecode" /> */}
      <div className="pb-3 w-[30%] font-black text-5xl flex md:ml-[140px] border-black mb-4 border-b sm:ml-0 mt-4 md:mt-[50px]">
        Latest Posts
      </div>
      {/* <hr className=" w-[150px] pl-[150px] border-t-2 border-black sm:ml-[0px]"/> */}
      <div className="flex flex-wrap justify-center md:pl-[100px] sm:ml-0 sm:w-[100%] ">
        <PostCard />
      </div>
    </div>
  );
};

export default HomePage;
