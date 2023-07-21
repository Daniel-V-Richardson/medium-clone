/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import SmallLogo from "../assets/img/logo-small.png";
import "./Write.css";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Write = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  const publishPost = async () => {
    const contentState = editorState.getCurrentContent();
    const contentHTML = stateToHTML(contentState);

    if (!title) {
      alert("Enter Title to Publish");
      return;
    } else if (!desc) {
      alert("Enter Description to Publish");
      return;
    } else if (!contentHTML) {
      alert("Enter Content to Publish");
      return;
    }

    const user = auth.currentUser;
    const postsCollection = collection(db, "Posts");
    const postData = {
      title: title,
      description: desc,
      content: contentHTML,
      author: user.email,
      profileImage: userData.profileImage,
      createdAt: serverTimestamp(),
      postId: "",
    };

    try {
      const newPostRef = await addDoc(postsCollection, postData);
      const newPostId = newPostRef.id;
      console.log("New post added with ID: ", newPostId);

      postData.postId = newPostId;

      await updateDoc(newPostRef, postData);

      const savedPostsCollection = collection(db, "SavedPosts");
      const savedPostData = {
        postId: newPostId,
        userId: user.uid,
      };
      console.log(savedPostData);
      await addDoc(savedPostsCollection, savedPostData);
      console.log("PostId saved to Firestore.");

      navigate(`/post/${newPostId}`);
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
          <Link to="/startreading">
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
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          className="write-description"
          value={desc}
          required
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="h-full border-l border-black pl-3 text-3xl">
          <Editor
          placeholder="Write Your Content here..."
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
