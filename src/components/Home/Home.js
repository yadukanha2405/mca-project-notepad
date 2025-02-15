import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import logo from "../../assets/logo.webp"


const Home = () => {
  return (
    <div className="home-container">
     
    {/* <header className="navbar">
  <div className="logo-container">
    <img src={logo} alt="i-Noteplus Logo" className="logo" />
    <div className="app-title">
      <h2>i-Notepad Plus</h2>
      <span>– A Secure and User-Friendly Online Note-Taking Application</span>
    </div>
  </div>
  <Link to="/auth" className="login-btn">Login / Sign Up</Link>
</header> */}

      <section className="hero">
        <h1>Welcome to i-Noteplus</h1>
        <p>
          Organize your thoughts, store important notes, and access them anytime, anywhere!
        </p>
        <Link to="/auth" className="get-started-btn">Get Started</Link>
      </section>

      <section className="features">
        <h2>Why Choose Our Notepad App?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>📝 Easy Note-Taking</h3>
            <p>Quickly jot down your ideas, to-dos, or reminders.</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure & Private</h3>
            <p>Your notes are securely stored and accessible only by you.</p>
          </div>
          <div className="feature">
            <h3>📂 Categorize Notes</h3>
            <p>Sort notes into different categories for easy organization.</p>
          </div>
          <div className="feature">
            <h3>🌍 Access Anywhere</h3>
            <p>Sync across devices and access your notes from anywhere.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Organizing Your Notes Today!</h2>
        <p>Sign up now and take control of your productivity.</p>
        <Link to="/auth" className="get-started-btn">Sign Up Now</Link>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} i-Noteplus | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
