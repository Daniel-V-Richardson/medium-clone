import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import DefaultUserImage from "../assets/img/default-user.png";
import "./EmailSignUp.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EmailSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
    setShowImagePickerDialog(false);
  };

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      let profileImageUrl = null;
      if (profileImage) {
        const storageRef = ref(storage, `profile_images/${uid}`);
        await uploadBytes(storageRef, profileImage);
        profileImageUrl = await getDownloadURL(storageRef);

        await updateProfile(auth.currentUser, {
          photoURL: profileImageUrl,
        });
      }

      const newData = {
        email: email,
        pass: password,
        profileImage: profileImageUrl,
      };
      const userDocRef = doc(db, "Users", uid);
      await setDoc(userDocRef, newData);

      navigate("/startreading");
    } catch (error) {
      console.error(error);
      alert("Error signing up. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="email-signin-container">
      {loading ? (
        <div className="bg-white w-[100vw] h-[100vh] flex justify-center items-center">
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            class="wheel-and-hamster"
          >
            <div class="wheel"></div>
            <div class="hamster">
              <div class="hamster__body">
                <div class="hamster__head">
                  <div class="hamster__ear"></div>
                  <div class="hamster__eye"></div>
                  <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
              </div>
            </div>
            <div class="spoke"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="email-signin-text">Sign up with email</div>
          <form>
            <div
              className="w-[150px] h-[150px] items-center m-auto border-1 border-black rounded-full overflow-hidden"
              onClick={() => setShowImagePickerDialog(true)}
            >
              {profileImage ? (
                <img
                  className="object-cover w-full h-full"
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                />
              ) : (
                <img
                  className="object-fill w-full"
                  src={DefaultUserImage}
                  alt="Default Profile"
                />
              )}
            </div>
            {showImagePickerDialog && (
                <div className="image-picker-dialog">
                  <input type="file" onChange={handleImageChange} />
                </div>
            )}
            <div className="email-inputs-container mt-10">
              <p>Your Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="email-inputs-container">
              <p>Your Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="email-continue-btn"
              onClick={handleSignup}
            >
              Continue
            </button>
          </form>
          <div className="signin-with-other-options-container">
            <MdOutlineKeyboardArrowLeft color="#25ae20" />
            <Link to="/getstarted" className="email-goback-text">
              All sign in options
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailSignUp;
