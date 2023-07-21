/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SignedInNav from "../Components/SignedInNav";
import { collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { Link } from "react-router-dom";
import DefaultUser from "../assets/img/default-user.png";

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    getSavedPosts();
  }, []);

  const getSavedPosts = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to view saved posts.");
        return;
      }

      const savedPostsCollection = collection(db, "SavedPosts");
      const querySnapshot = await getDocs(
        query(savedPostsCollection, where("userId", "==", user.uid))
      );

      const savedPostIds = querySnapshot.docs.map((doc) => doc.data().postId);
      console.log(savedPostIds);

      const postsCollection = collection(db, "Posts");
      const savedPostsQuerySnapshot = await getDocs(
        query(postsCollection, where("postId", "in", savedPostIds))
      );

      const savedPostsArray = [];
      savedPostsQuerySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postWithId = { ...postData, id: doc.id };
        savedPostsArray.push(postWithId);
      });

      setSavedPosts(savedPostsArray);
      console.log(savedPosts);
    } catch (error) {
      console.log("Error fetching saved posts: ", error);
    }
  };

  return (
    <div>
      <SignedInNav />
      <div className="pl-14 pr-14 items-center justify-center flex flex-col">
        <h1 className="font-black text-6xl">Saved Posts</h1>
        <div className="flex flex-wrap gap-3 mt-5 w-full h-[500px] overflow-scroll no-scrollbar">
          {savedPosts.map((post) => (
            <div
              className="w-full border-b-2 md:w-[30%] h-[60%] overflow-hidden items-center mb-3 shadow-md offset-y-5 offset-x-0 blur-15 bg-white rounded-[1rem] sm:w-[100%] p-3 hover:scale-105 transition-all ease-in-out"
              key={post.id}
            >
              <Link className="flex gap-3 mb-2 text-justify justify-start items-center no-underline text-black">
                <div className="w-[30px] h-[30px] m-0 items-center border-1 border-black rounded-full overflow-hidden">
                  {post.profileImage ? (
                    <img
                      alt="Default"
                      src={post.profileImage}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      alt="Default"
                      src={DefaultUser}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <p className="justify-center my-auto font-sans text-center font-medium">
                  {post.author}
                </p>
                ⚪
                <p className="justify-center my-auto font-sans text-center font-medium text-gray-400">
                  {post.createdAt &&
                    new Date(post.createdAt.seconds * 1000).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="nb nc"
                >
                  <path
                    d="M12.4 12.77l-1.81 4.99a.63.63 0 0 1-1.18 0l-1.8-4.99a.63.63 0 0 0-.38-.37l-4.99-1.81a.62.62 0 0 1 0-1.18l4.99-1.8a.63.63 0 0 0 .37-.38l1.81-4.99a.63.63 0 0 1 1.18 0l1.8 4.99a.63.63 0 0 0 .38.37l4.99 1.81a.63.63 0 0 1 0 1.18l-4.99 1.8a.63.63 0 0 0-.37.38z"
                    fill="#FFC017"
                  ></path>
                </svg>
              </Link>
              <Link
                to={`/post/${post.id}`}
                className="text-justify justify-start items-center no-underline text-black"
              >
                <h3 className="text-left font-black text-[1 rem]">
                  {post.title}
                </h3>
                <p className="text-black font-serif text-[1 rem]">
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
