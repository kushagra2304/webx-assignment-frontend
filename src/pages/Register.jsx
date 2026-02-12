import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    window.location.href = "/login";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full Name"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Contact Number"
        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />

      <input placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button>Register</button>
    </form>
  );
}
