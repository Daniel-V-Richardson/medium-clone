/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import SmallLogo from "../assets/img/logo-small.png";
import "./Write.css";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Write = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        alert("Error getting user data from Firestore: " + error);
        setLoading(false);
      });
  }

  const publishPost = async() => {
    const user = auth.currentUser;  
    const postsCollection = collection(db, "Posts");
    const postData = {
      title: title,
      description: desc,
      content: content,
      author: user.email,
      createdAt: serverTimestamp(),
    };

    try {
      const newPostRef = await addDoc(postsCollection, postData);
      console.log("New post added with ID: ", newPostRef.id);
      navigate("/startreading");
    } catch (error) {
      alert("Error publishing post: " + error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="write-container">
      <div className="write-nav-container">
        <div className="write-nav-left-container">
          <Link to="/">
            <img src={SmallLogo} alt="" />
          </Link>
          <p>Draft in {userData?.email}</p>
        </div>
        <div className="write-nav-right-container">
          <button className="publish-btn" onClick={publishPost}>
            Publish
          </button>
        </div>
      </div>
      <div className="main-content-container">
        <input
          type="text"
          placeholder="Title..."
          className="write-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          className="write-description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Start writing your Content here..."
          className="write-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Write;
