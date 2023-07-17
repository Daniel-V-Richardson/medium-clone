// PostDetails.js

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import SignedInNav from "./SignedInNav";
import DefaultUserImage from "../assets/img/default-user.png";
import { IoArrowBack } from "react-icons/io5";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [morePosts, setMorePosts] = useState([]);

  useEffect(() => {
    // Fetch the post details from Firestore using the postId

    const fetchPostDetails = async () => {
      try {
        const postRef = doc(db, "Posts", postId);
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
          setPost(postSnapshot.data());
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log("Error fetching post details: ", error);
      }
    };
    fetchPostDetails();
    const fetchMorePosts = async () => {
      try {
        const q = query(
          collection(db, "Posts"),
          where("author", "==", post.author)
        );
        const querySnapshot = await getDocs(q);
        const morePostsData = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== postId) {
            const postData = doc.data();
            const postWithId = { ...postData, id: doc.id };
            morePostsData.push(postWithId);
          }
        });
        setMorePosts(morePostsData);
      } catch (error) {
        console.log("Error fetching more posts: ", error);
      }
    };
    if (post) {
      fetchMorePosts();
    }
  }, [postId, post, morePosts]);

  // Render the post details
  return (
    <div>
      <SignedInNav />
      <Link
        to="/startreading"
        className="pl-2 md:pl-[25%] md:pr-[25%] flex no-underline text-black"
      >
        <IoArrowBack size={32} />
      </Link>
      {post ? (
        <div className="h-[600px] overflow-scroll no-scrollbar">
          <div className="pl-2 pr-2 md:pl-[25%] md:pr-[25%]">
            <div className="flex mt-[40px] gap-2 items-center justify-left ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="fm fn"
              >
                <path
                  d="M12.4 12.77l-1.81 4.99a.63.63 0 0 1-1.18 0l-1.8-4.99a.63.63 0 0 0-.38-.37l-4.99-1.81a.62.62 0 0 1 0-1.18l4.99-1.8a.63.63 0 0 0 .37-.38l1.81-4.99a.63.63 0 0 1 1.18 0l1.8 4.99a.63.63 0 0 0 .38.37l4.99 1.81a.63.63 0 0 1 0 1.18l-4.99 1.8a.63.63 0 0 0-.37.38z"
                  fill="#FFC017"
                ></path>
              </svg>
              Members only story
            </div>
            <h1 className="flex mt-4 items-center text-left font-black">
              {post.title}
            </h1>
            <p className="flex mt-2 items-center text-left font-medium text-gray-500">
              {post.description}
            </p>

            <div className="flex flex-row mt-3 ">
              <div className="border-1 w-12 h-12 rounded-full p-1 md:mr-3 border-black">
                <img
                  className="w-10 object-contain overflow-hidden"
                  src={DefaultUserImage}
                  alt="userimage"
                />
              </div>
              <div className="flex flex-col text-left m-0">
                <p className="m-0 font-bold">{post.author}</p>
                <div className="flex gap-2">
                  <p className="">6 min read</p>
                  <p className="mt-[-5px] font-black text-md ">.</p>
                  <p className=" m-0">
                    {post.createdAt &&
                      new Date(
                        post.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-justify text-1xl">
              <span className="text-7xl font-bold">
                {post.content.charAt(0)}
              </span>
              {post.content.slice(1)}
            </p>
          </div>

          <div className="bg-[#f9f9f9]">
            <div className="items-center pl-2 pr-2 flex flex-col md:pl-[25%] md:pr-[25%]">
              <div className="flex w-[100px] h-[100px] border-1 border-black rounded-full p-2 mt-14">
                <img
                  src={DefaultUserImage}
                  alt="userimage"
                  className="object-contain w-[90px]"
                />
              </div>
              <p className="flex mt-2 text-2xl font-bold">
                Written by {post.author}
              </p>
              <p className="flex sm:text-center">
                CEO of Gado Images | Content Consultant | Covers tech, food, AI
                & photography | http://bayareatelegraph.com &
                http://lifetechshorts.com | tom@gadoimages.com
              </p>
              <hr />
              <div className="flex flex-col">
                <p className="flex text-[1rem] font-medium">
                  More from {post.author}
                </p>
                <div className="flex flex-row flex-wrap">
                  {morePosts.map((morePost) => (
                    <Link
                      key={morePost.id}
                      to={`/post/${morePost.id}`}
                      className="flex gap-2 mt-2 text-black no-underline flex-col text-left w-[50%]"
                    >
                      <div className="flex gap-2">
                        <div className="flex w-10 h-10 rounded-full border-1 border-black">
                          <img src={DefaultUserImage} className="" alt="" />
                        </div>
                        <p className="items-center justify-center mt-auto  mb-auto">{morePost.author}</p>
                      </div>
                      <p className="font-bold m-0">{morePost.title}</p>
                      <p className="font-medium m-0">{morePost.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
