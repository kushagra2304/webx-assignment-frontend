import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    API.get("/users/profile").then((res) => {
      setProfile(res.data);
      setImagePreview(res.data.profileImage || null);
    });
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await API.put("/users/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImagePreview(res.data.profileImage);
  };

  const removeImage = async () => {
    await API.delete("/users/profile-image");
    setImagePreview(null);
  };

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-950 to-neutral-900">
        <p className="text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    );

  const initial = profile.fullName?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-neutral-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-3xl w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 shadow-xl shadow-black/50">

        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/40 shadow-lg shadow-indigo-900/40"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-neutral-800 flex items-center justify-center text-4xl font-bold text-white border-4 border-indigo-500/30">
                {initial}
              </div>
            )}

            <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 p-2 rounded-full cursor-pointer shadow-lg transition">
              <input type="file" className="hidden" onChange={handleImageChange} />
              📷
            </label>
          </div>

          {imagePreview && (
            <button
              onClick={removeImage}
              className="mt-3 text-xs text-red-400 hover:text-red-300 transition"
            >
              Remove Photo
            </button>
          )}

          <h2 className="text-2xl font-bold text-white mt-4">
            {profile.fullName}
          </h2>

          <span className="mt-2 px-4 py-1 text-xs font-medium rounded-full border 
                           bg-indigo-600/20 text-indigo-400 border-indigo-500/30">
            {profile.role}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <InfoCard label="Email" value={profile.email} />
          <InfoCard label="Username" value={profile.username} />
          <InfoCard label="Role" value={profile.role} />
          <InfoCard
            label="Account Created"
            value={new Date(profile.createdAt).toLocaleDateString()}
          />

        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-700">
      <p className="text-gray-400">{label}</p>
      <p className="text-white font-medium break-all">{value}</p>
    </div>
  );
}
