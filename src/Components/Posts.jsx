import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard.jsx";
import SmallInfoCard from "../Components/SmallInfoCard.jsx"
import WritingOnMedium from "../Components/WritingOnMedium.jsx"

const Posts = () => {
  return (
    <div className="flex m-0 w-full h-full">
      <div className="lg:w-[70%] flex flex-col lg:pl-60 md:w-[100%]  md:pl-10 sm:pl-10 sm:w-[100%]">
        <div className="pt-10 flex gap-10 ">
          <Link className="no-underline text-black">For you</Link>
          <Link className="no-underline text-black">Following</Link>
          <Link className="no-underline text-black">Technology</Link>
          <Link className="no-underline text-black">Data Science</Link>
          <Link className="no-underline text-black">Programming</Link>
        </div>
        <hr className="text-black" />
        <div className="h-[500px] overflow-scroll no-scrollbar">
          <PostCard />
        </div>
      </div>
      <div className="md:w-[0%] sm:w-[0%] xl:w-[30%] border-l-2 lg:w-[30%] lg:overflow-scroll no-scrollbar ">
        <p className="flex ml-10 font-bold text-2xl mt-10">Staff Picks</p>
        <SmallInfoCard />
        <WritingOnMedium />
      </div>
    </div>
  );
};

export default Posts;
