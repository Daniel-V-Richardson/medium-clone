import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import "./App.css";
import JoinMedium from "./Pages/JoinMedium.jsx";
import SigninPage from "./Pages/SigninPage.jsx";
import EmailSignIn from "./Pages/EmailSignIn.jsx";
import EmailSignUp from "./Pages/EmailSignUp.jsx";
import Write from "./Pages/Write.jsx";
import StartReadingPage from "./Pages/StartReadingPage.jsx";
import PostDetails from "./Components/PostDetails.jsx";
import { useAuth } from "./AuthContext.js";
import FeedbackPage from "./Pages/FeedbackPage.jsx";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/getstarted" element={<JoinMedium />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/email-signup" element={<EmailSignUp />} />
        <Route
          path="/startreading"
          element={currentUser ? <StartReadingPage /> : <HomePage />}
        />
        <Route path="/write" element={currentUser ? <Write /> : <HomePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="*" element={<HomePage />} />

        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
