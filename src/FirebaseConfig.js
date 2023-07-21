/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQVpOEIYW0gZDmbxwR8MwPSts_Z2OX8aY",
  authDomain: "medium-clone-6a53b.firebaseapp.com",
  projectId: "medium-clone-6a53b",
  storageBucket: "medium-clone-6a53b.appspot.com",
  messagingSenderId: "518201045783",
  appId: "1:518201045783:web:067c3dffc82f1e34177d52"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export {auth , storage, db}