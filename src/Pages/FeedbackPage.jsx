import React, { useState } from "react";
import { validAge, validEmail, validName, validPhone } from "../Regex";
import ReactStars from "react-stars";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SignedInNav from "../Components/SignedInNav";

const FeedbackPage = () => {
  const [ratings, setRatings] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(new Date());
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const dob = calculateAge(age);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(ratings);
    if (!validEmail.test(email)) {
      alert("The Entered Email is not valid, Example: youremail@domain.com");
      return;
    }
    if (!validName.test(name)) {
      alert(
        "Name should not contain Numbers or Characters. And Name should be greater than 3 Alphabets"
      );
      return;
    }
    if (!validAge.test(dob)) {
      alert("You should be 18+ in order to provide feedback");
      return;
    }
    if (!validPhone.test(phone)) {
      alert("Phone number must be 10 Numbers");
      return;
    }
    setLoading(true);

    fetch("https://formspree.io/f/xoqovaoy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, feedback, dob, ratings }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        setLoading(false);
        alert("Failed to submit feedback. Please try again later.");
      });
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setFeedback("");
    setAge("");
  };

  return (
    <div>
      <SignedInNav />
      <div className="flex flex-col items-center justify-center h-[600px] overflow-scroll no-scrollbar">
        <h1 className="text-4xl font-black mt-[760px]">Feedback Form</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-[100px] justify-center p-3 text-center m-0"
        >
          <p className="m-0 text-black text-3xl text-left">Enter your name:</p>
          <input
            className="text-3xl outline-none border-1 border-black rounded-2 p-3"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="m-0 text-black text-3xl text-left">Enter your Email:</p>
          <input
            className="text-3xl outline-none border-1 border-black rounded-2 p-3"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="m-0 text-black text-3xl text-left">
            Enter your Phone Number:
          </p>
          <input
            className="text-3xl outline-none border-1 border-black rounded-2 p-3"
            type="number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="m-0 text-black text-3xl text-left ">
            Enter your Date of Birth:
          </p>
          <DatePicker onChange={setAge} value={age} />
          <p className="text-1xl text-black font-bold">Your Age is: {dob}</p>

          <p className="m-0 text-black text-3xl text-left ">
            Enter your Address:
          </p>
          <textarea
            className="text-3xl outline-none border-1 border-black rounded-2 p-3"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <p className="m-0 text-black text-3xl text-left ">
            How do you rate the quality of the product ?
          </p>
          <div className="">
            <ReactStars
              count={5}
              onChange={setRatings}
              size={34}
              color2={"#ffd700"}
            />
          </div>
          <div className="flex flex-row gap-3">
            <p className="m-0 text-black text-3xl text-left ">
              Would you like to receive the Newsletter ?
            </p>
            <input type="checkbox" className="w-[20px]" />
          </div>
          <p className="m-0 text-black text-3xl text-left ">
            Please Provide your Feedback
          </p>
          <textarea
            className="text-3xl outline-none border-1 border-black rounded-3 p-4"
            type="text"
            rows={2}
            cols={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <input
              type="submit"
              value="Submit Feedback"
              className="p-3 bg-black text-white font-black rounded-full"
            />
          )}
          {submitted && (
            <div className="mt-4 text-green-500 font-bold">
              Feedback sent successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
