/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SmallLogo from "../assets/img/logo-small.png";
import { IoSearchOutline } from "react-icons/io5";
import { RxPencil2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import SearchComponent from "../Components/Search.jsx";

const SignedInNav = () => {
  const [userData, setUserData] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user);
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUserData(user) {
    if (userData) {
      return;
    }
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
    <div className="sm:w-[100%] w-full h-[40%] bg-white text-white flex flex-row first-letter:justify-between pr-2 pl-2">
      <div className="md:w-[60%] flex">
        <Link to="/startreading">
          <img src={SmallLogo} alt="Medium" className="w-20" />
        </Link>
        <div className="mt-auto mb-auto">
          <div className="hidden  md:flex bg-[#f9f9f9] p-2 rounded-full my-auto items-center gap-2">
            <IoSearchOutline color="#b2b2b2" size={25} />
            <input
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search Medium"
              className="bg-inherit outline-none text-black"
            />
          </div>
          {searchItem ? <SearchComponent /> : <></>}
        </div>
      </div>
      <div className="flex gap-4  w-[100%] pr-5 justify-end items-center my-auto">
        <Link
          to="/feedback"
          className="hidden  md:flex flex-row text-black no-underline gap-2"
        >
          <VscFeedback color="black" size={25} />
          <p className="m-0">Feedback</p>
        </Link>
        <Link
          to="/write"
          className=" flex flex-row text-black no-underline gap-2"
        >
          <RxPencil2 color="black" size={25} />
          <p className="m-0">Write</p>
        </Link>
        <Link
          to="/saved"
          className=" flex flex-row text-black no-underline gap-2"
        >
          <AiOutlineHeart color="black" size={25} />
          <p className="m-0">Saved</p>
        </Link>
        <div className="text-white bg-black md:pt-2 pb-2 pl-4 pr-4 rounded-full m-0 flex cursor-pointer">
          Welcome, {userData?.email}
        </div>
        <Link to="/profile" className="w-11 h-11  overflow-hidden border-1 rounded-full">
          <img
            src={userData?.profileImage}
            className="w-full h-full m-auto object-cover"
            alt="profileImage"
          />
        </Link>
        <Link
          className="flex no-underline text-black font-bold "
          onClick={Logout}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SignedInNav;
