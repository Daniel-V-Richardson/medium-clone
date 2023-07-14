import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import "./App.css";
import JoinMedium from "./Pages/JoinMedium.jsx";
import SigninPage from "./Pages/SigninPage.jsx";
import EmailSignIn from "./Pages/EmailSignIn.jsx";
import EmailSignUp from "./Pages/EmailSignUp.jsx";
import Write from "./Pages/Write.jsx";
import StartReadingPage from "./Pages/StartReadingPage.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/getstarted" element={<JoinMedium />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/email-signup" element={<EmailSignUp />} />
        <Route path="/write" element={<Write />} />
        <Route path="/startreading" element={<StartReadingPage />} />
      </Routes>
    </div>
  );
}

export default App;
