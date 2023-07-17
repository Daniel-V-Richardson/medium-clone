import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultUser from "../assets/img/default-user.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Link } from "react-router-dom";

const PostCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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

  return (
    <div>
      {data.map((post) => (
        <div className="border-b-2 md:w-[70%] mb-3 shadow-md offset-y-5 offset-x-0 blur-15 bg-white rounded-[1rem] sm:w-[100%] p-3 hover:scale-105 transition-all ease-in-out" key={post.id} >
          <Link className="flex gap-3 mb-2 text-justify justify-start items-center no-underline text-black">
            <img
              alt="Default"
              src={DefaultUser}
              className="border-2 border-black w-[4%] rounded-full"
            />
            <p className="justify-center my-auto font-sans text-center font-medium">
              {post.author}
            </p>
            ⚪
            <p className="justify-center my-auto font-sans text-center font-medium text-gray-400">
            {post.createdAt && new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" class="nb nc"><path d="M12.4 12.77l-1.81 4.99a.63.63 0 0 1-1.18 0l-1.8-4.99a.63.63 0 0 0-.38-.37l-4.99-1.81a.62.62 0 0 1 0-1.18l4.99-1.8a.63.63 0 0 0 .37-.38l1.81-4.99a.63.63 0 0 1 1.18 0l1.8 4.99a.63.63 0 0 0 .38.37l4.99 1.81a.63.63 0 0 1 0 1.18l-4.99 1.8a.63.63 0 0 0-.37.38z" fill="#FFC017"></path></svg>
          </Link>
          <Link  to={`/post/${post.id}`}  className="text-justify justify-start items-center no-underline text-black">
            <h3 className="text-left font-black text-[1 rem]">{post.title}</h3>
            <p className="text-black font-serif text-[1 rem]">
              {post.description}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
