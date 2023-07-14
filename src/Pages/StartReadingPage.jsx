import React from "react";
import SignedInNav from "../Components/SignedInNav.jsx"
import Posts from '../Components/Posts.jsx'

const StartWriting = () => {
  return <div className="m-0 p-0 w-[100%] h-[100%]">
    <SignedInNav />
    <hr className="m-0"/>
    <Posts/>
  </div>;
};

export default StartWriting;
