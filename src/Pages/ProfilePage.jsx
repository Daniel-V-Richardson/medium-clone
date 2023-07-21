import React, { useEffect, useState } from "react";
import SignedInNav from "../Components/SignedInNav";
import DefaultUser from "../assets/img/default-user.png";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserData(user.uid);
    }
  }, []);

  const getUserData = async (userId) => {
    try {
      const usersCollection = collection(db, "Users");
      const docRef = doc(usersCollection, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData);
        setEmail(userData.email || "");
        setPass(userData.pass || "");
      }
    } catch (error) {
      console.log("Error getting user data from Firestore: ", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      const usersCollection = collection(db, "Users");
      const docRef = doc(usersCollection, user.uid);
      const updatedData = {
        email,
        pass,
      };
      await updateDoc(docRef, updatedData);
      setUserData({ ...userData, email, pass });
    } catch (error) {
      console.log("Error updating user profile: ", error);
    }
  };

  return (
    <div>
      <SignedInNav />
      {userData && (
        <div className="p-4">
          <h2 className="text-4xl mt-4 mb-4 font-black">Profile</h2>
          <div className="pl-[30%] pr-[30%] text-center">
            <div className="w-[100px] h-[100px] items-center border-2 border-black rounded-full overflow-hidden m-auto">
              {userData.profileImage ? (
                <img
                  alt="Profile"
                  src={userData.profileImage}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  alt="Profile"
                  src={DefaultUser}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="w-[50%] flex flex-col items-center justify-center m-auto pt-10">
              <label className="block text-2xl font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mb-4 border rounded p-2"
              />
              <label className="block text-2xl font-medium mb-2">
                Password
              </label>
              <input
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="block w-full mb-14 border rounded p-2"
              />
              <Link
                onClick={handleUpdateProfile}
                className="pt-3 pb-3 pl-14 pr-14 bg-black text-white rounded-full no-underline "
              >
                Update
              </Link>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
