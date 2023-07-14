import React from "react";
import { Link } from "react-router-dom";
import SmallLogo from "../assets/img/logo-small.png"
import TwitterLogo from "../assets/img/twitterlogo.svg"

const WritingOnMedium = () => {
  return (
    <div className="flex flex-col pb-10">
      <div className="bg-[#c4e2ff] w-[70%] flex flex-col mt-10 pl-10 pr-10 pt-3 pb-3 ml-11 rounded-md">
        <div className="flex font-black mt-3">Writing on Medium</div>
        <div className="mt-4 flex flex-col items-start font-semibold">
          <p>New Writer FAQ</p>
          <p>Expert Writing Advice</p>
          <p>Grow your leadership</p>
        </div>
        <Link
          to="/write"
          className=" flex p-1 w-[150px] justify-center rounded-full no-underline text-white font-bold bg-black"
        >
          Start Writing
        </Link>
      </div>
      <div class=" flex w-[100px] ml-[150px] mt-5  items-center">
        <img className="w-[50px]" src={SmallLogo} alt="" />
        <svg width="19" height="19" class="bz">
          <path d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9v6z" fill-rule="evenodd"></path>
        </svg>
        <svg width="29" height="29">
          <path d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"></path>
        </svg>
      </div>
      <div className="mt-[20px] w-[50%] flex ml-[100px]">Discover Medium writers you already follow on Twitter.</div>
    <div className="flex flex-row ml-[120px] mt-[30px] p-2 rounded-full border-2 border-black justify-center w-[190px]">
        <img className="w-[30px]" src={TwitterLogo} alt="" />
        Connect to twitter
    </div>
    </div>
  );
};

export default WritingOnMedium;
