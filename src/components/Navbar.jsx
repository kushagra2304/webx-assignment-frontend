import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const linkStyle = (path) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === path
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40 "
      : "text-gray-300 hover:text-white hover:bg-neutral-800"
    }`;

  return (
    <nav className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between shadow-lg shadow-black/40">
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-bold text-white tracking-wide">
          TaskManager
        </h2>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/tasks" className={linkStyle("/tasks")}>
            Tasks
          </Link>
          <Link to="/profile" className={linkStyle("/profile")}>
            Profile
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="px-3 py-1 text-xs font-medium rounded-full border 
             bg-indigo-600/20 text-indigo-400 border-indigo-500/30 
             shadow-md shadow-indigo-900/30 backdrop-blur-sm"
        >
          {user.role === "admin" ? "Admin" : "User"}
        </span>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-red-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
