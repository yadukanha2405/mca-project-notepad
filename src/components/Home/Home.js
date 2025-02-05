import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header>
        <h1>Smart Notepad</h1>
        <p>Write, Organize, and Search Your Notes Effortlessly</p>
        <button onClick={() => navigate("/notes")}>Start Writing</button>
      </header>

      <section className="features">
        <h2>Why Use Smart Notepad?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>📝 Create & Manage Notes</h3>
            <p>Write down your ideas quickly and categorize them.</p>
          </div>
          <div className="feature">
            <h3>🔍 Search Instantly</h3>
            <p>Find your notes easily with an efficient search system.</p>
          </div>
          <div className="feature">
            <h3>📌 Organize by Category</h3>
            <p>Keep your notes structured with custom categories.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Smart Notepad | Developed by Kanhaiya Yadav</p>
      </footer>
    </div>
  );
};

export default Home;
