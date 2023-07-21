/* eslint-disable react-hooks/exhaustive-deps */
// import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultUser from "../assets/img/default-user.png";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { Link } from "react-router-dom";
import { FiShare } from "react-icons/fi";
import { MdOutlineBookmarkAdd, MdContentCopy } from "react-icons/md";

const PostCard = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postLink, setPostLink] = useState("");

  useEffect(() => {
    getData();
  }, []);
  const savePost = async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to save posts.");
        return;
      }

      const savedPostsCollection = collection(db, "SavedPosts");
      const savedPostData = {
        postId,
        userId: user.uid,
      };

      await addDoc(savedPostsCollection, savedPostData);
      alert("Post saved successfully!");
    } catch (error) {
      console.log("Error saving post: ", error);
      alert("Error saving post.");
    }
  };

  const getData = async () => {
    if (data.length > 0) {
      return;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "Posts"));
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postWithId = { ...postData, id: doc.id };
        dataArray.push(postWithId);
      });
      setData(dataArray);
    } catch (error) {
      console.log("Error getting data from Firestore: ", error);
    }
  };
  const handleShareClick = (postId) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    setPostLink(postLink);
    setShowModal(true);
  };
  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = postLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Post link copied to clipboard!");
  };

  return (
    <div>
      {data.map((post) => (
        <div
          className="w-full border-b-2 md:w-[90%] items-center mb-3 shadow-md offset-y-5 offset-x-0 blur-15 bg-white rounded-[1rem] sm:w-[100%] p-3 hover:scale-105 transition-all ease-in-out"
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
            <h3 className="text-left font-black text-[1 rem]">{post.title}</h3>
            <p className="text-black font-serif text-[1 rem]">
              {post.description}
            </p>
          </Link>
          <div className="w-full h-full flex justify-end gap-4">
            <Link
              className="no-underline text-black"
              onClick={() => handleShareClick(post.id)}
            >
              <FiShare size={21} />
            </Link>
            <Link
              className="no-underline text-black"
              onClick={() => savePost(post.id)}
            >
              <MdOutlineBookmarkAdd size={21} />
            </Link>
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-[30%] relative">
            <div className="flex items-center m-auto text-center justify-center p-[1px] mb-5 w-10 float-right rounded-full bg-[#ff0000] text-white">
              <button
                className="text-white text-3xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <p className="mb-2 text-3xl font-black">Share this post</p>
            <div className="w-full flex m-auto items-center justify-center gap-3">
              <input
                type="text"
                value={postLink}
                readOnly
                className="w-full px-2 py-1 mb-2 border rounded"
              />
              <div className="cursor-pointer p-2 rounded-full bg-[#7f7f7f]">
                <MdContentCopy onClick={copyToClipboard} color="white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
