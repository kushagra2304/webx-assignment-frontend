import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/users/profile").then((res) =>
      setProfile(res.data)
    );
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.fullName}</p>
      <p>Email: {profile.email}</p>
      <p>Username: {profile.username}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
}
