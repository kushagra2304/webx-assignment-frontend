import { useState } from "react";
import API from "../api/axios";

export default function TaskAdd({ fetchTasks }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsAdding(true);

    try {
      await API.post("/tasks", form);
      setForm({ title: "", description: "", status: "pending" });
      fetchTasks();
      setTimeout(() => setIsAdding(false), 300);
    } catch (error) {
      console.error(error);
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-3 relative overflow-hidden group shadow-lg shadow-black/60 mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <h3 className="mb-2 text-base font-bold text-white tracking-wide">
          New Task
        </h3>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full bg-neutral-900/80 border border-neutral-800 px-4 py-3 rounded-3xl text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            required
          />
          {form.title && (
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, title: "" })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative mb-3">
          <textarea
            placeholder="Add some details... (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows="3"
            className="w-full bg-neutral-900/70 border border-neutral-800 px-4 py-3 rounded-3xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-gray-500 text-white text-sm"
          />
          {form.description.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              {form.description.length} chars
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isAdding || !form.title.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-3xl font-bold tracking-wide shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </>
          ) : (
            <span>Add Task</span>
          )}
        </button>
      </div>
    </form>
  );
}
