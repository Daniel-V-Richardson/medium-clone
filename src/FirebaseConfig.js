/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxQz9EPUMCKRbPTmfazUzw-T_COsFddb4",
  authDomain: "medium-clone-65c88.firebaseapp.com",
  projectId: "medium-clone-65c88",
  storageBucket: "medium-clone-65c88.appspot.com",
  messagingSenderId: "247169101132",
  appId: "1:247169101132:web:1e2a4ecbaf58c1cc03b3e9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export {auth , storage, db}