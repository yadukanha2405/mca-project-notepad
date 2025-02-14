import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import "../Header/header.css";

const Headerr = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if using localStorage/sessionStorage)
    localStorage.removeItem("userToken"); // Adjust as per your auth method
    navigate("/"); // Redirect to Home
  };

  return (
    <header className="navbar">
      <div className="logo-container">
      <img src={logo} alt="i-Noteplus Logo" className="logo" />
        <div className="app-title">
          <h2>i-Notepad Plus</h2>
          <span>– A Secure and User-Friendly Online Note-Taking Application</span>
        </div>
      </div>
      {location.pathname === "/notepad" ? (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/auth" className="login-btn">Login / Sign Up</Link>
      )}
    </header>
  );
};

export default Headerr;
