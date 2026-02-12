import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/tasks";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-black via-neutral-950 to-neutral-900 px-6">

      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-sm 
                      border border-neutral-800 rounded-2xl p-8 
                      shadow-xl shadow-black/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight 
               underline decoration-indigo-500 decoration-4 underline-offset-8">
            Login
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Login to continue managing your tasks
          </p>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Username:
            </label>
            <input
              type="text"
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-full bg-neutral-800 
                         border border-neutral-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
              onChange={(e) =>
                setForm({ ...form, emailOrUsername: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password:
            </label>
            <input
              type="password"
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-full bg-neutral-800 
                         border border-neutral-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 
             hover:bg-indigo-500 
             text-white py-3 rounded-full font-semibold 
             shadow-lg shadow-indigo-900/40 
             transition-all duration-200 
             hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Login
          </button>


        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}
