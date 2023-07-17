import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../Components/Navbar.jsx";
import Banner from "../Components/Banner.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import PostCard from "../Components/PostCard";
import Spline from "@splinetool/react-spline";

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
      {/* <Banner /> */}
      <Spline className="w-[10%] h-[10%]" scene="https://prod.spline.design/WTl0uo3oqQuNt3pf/scene.splinecode">
       <h1 className="z-10">Start Reading</h1>
      </Spline>
      <div className=" font-black text-5xl flex md:ml-[150px]  sm:ml-0 mt-4 md:mt-[50px] ] ">
        Latest Posts
      </div>
      <hr className="w-[150px] md:ml-[150px] border-t-2 border-black sm:ml-[30px] " />
      <div className="flex flex-wrap justify-center md:pl-[100px] sm:pl-0  ">
        <PostCard />
      </div>
    </div>
  );
};

export default HomePage;
