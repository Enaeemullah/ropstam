import './App.css';
import { useEffect } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Redirect to="/signin" />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
