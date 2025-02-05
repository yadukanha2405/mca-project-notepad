import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Notepad App</h1>
      <p>
        Organize your thoughts, store important notes, and access them anytime!
      </p>
      <Link to="/auth" className="get-started-btn">Get Started</Link>
    </div>
  );
};

export default Home;