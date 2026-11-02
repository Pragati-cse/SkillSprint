import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageTitles = {
  "/": ["Dashboard", "Your learning journey at a glance."],
  "/skills": ["My Skills", "Build your skills, one step at a time."],
  "/topics": ["Learning Topics", "Keep track of what you are learning."],
  "/practice": ["Practice & Revision", "Turn knowledge into consistent practice."],
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [title, subtitle] =
    pageTitles[location.pathname] || pageTitles["/"];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">MY LEARNING SPACE</p>
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div className="header-right">
        <div className="date-chip">
          ✦ {user?.name || "My progress"}
        </div>

        <div className="avatar header-avatar">
          {user?.name?.charAt(0).toUpperCase() || "S"}
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}