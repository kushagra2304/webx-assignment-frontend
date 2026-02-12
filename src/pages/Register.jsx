import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        username: "",
        password: "",
        role: "user"
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await API.post("/auth/register", form);
            window.location.href = "/login";
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-black via-neutral-950 to-neutral-900 px-6 py-10">

            <div className="w-full max-w-lg bg-neutral-900/80 backdrop-blur-sm 
                      border border-neutral-800 rounded-2xl p-8 
                      shadow-xl shadow-black/50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight 
               underline decoration-indigo-500 decoration-4 underline-offset-8">
                        Sign Up!
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Join TaskManager and start organizing today
                    </p>
                </div>
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        label="Full Name"
                        type="text"
                        placeholder="Enter full name"
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <InputField
                        label="Contact Number"
                        type="text"
                        placeholder="Enter contact number"
                        onChange={(e) =>
                            setForm({ ...form, contactNumber: e.target.value })
                        }
                    />

                    <InputField
                        label="Username"
                        type="text"
                        placeholder="Choose username"
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Create password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Role
                        </label>
                        <select
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-full bg-neutral-800 
                         border border-neutral-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
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
                        Register
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

function InputField({ label, type, placeholder, onChange }) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">
                {label}
            </label>
            <input
                type={type}
                required
                placeholder={placeholder}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-full bg-neutral-800 
                   border border-neutral-700 text-white 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
            />
        </div>
    );
}
