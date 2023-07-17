import React, { useState } from "react";
import SignedInNav from "../Components/SignedInNav";

const FeedbackPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    fetch("https://formspree.io/f/xoqovaoy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback }),
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
  };

  return (
    <div>
      <SignedInNav />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mt-12">Feedback Form</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-12 mt-[100px] justify-center items-center text-center"
        >
          <input
            className="text-3xl text-center outline-none"
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="text-3xl outline-none text-center"
            type="text"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="text-3xl outline-none text-center"
            type="text"
            placeholder="Enter Your Feedback"
            required
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
