import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email or Username"
        onChange={(e) =>
          setForm({ ...form, emailOrUsername: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button>Login</button>
    </form>
  );
}
