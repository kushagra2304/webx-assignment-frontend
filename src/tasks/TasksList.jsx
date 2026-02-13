import { useState } from "react";
import API from "../api/axios";

export default function TasksList({
    tasks = [],
    fetchTasks,
    filter,
    setFilter,
    search,          
    setSearch       
}) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        await fetchTasks();
    };

    const updateStatus = async (id, status) => {
        await API.put(`/tasks/${id}`, { status });
        await fetchTasks();
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDesc(task.description || "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDesc("");
    };

    const saveEdit = async (id, status) => {
        await API.put(`/tasks/${id}`, {
            title: editTitle,
            description: editDesc,
            status
        });

        setEditingId(null);
        await fetchTasks();
    };

    return (
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-lg shadow-black/60 space-y-4">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
                className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />

            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">Tasks</h2>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-gray-200">
                        {tasks.length}
                    </span>
                </div>

                <select
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    className="bg-neutral-900 border border-neutral-800 text-gray-200 text-sm px-3 py-2 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                >
                    <option value="">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                    No tasks available
                </div>
            )}

            <div className="space-y-3">
                {tasks.map((task) => {
                    const isEditing = editingId === task.id;

                    return (
                        <div
                            key={task.id}
                            className="rounded-xl p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all"
                        >
                            {isEditing ? (
                                <div className="space-y-3">
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-xl text-white"
                                    />

                                    <textarea
                                        value={editDesc}
                                        onChange={(e) => setEditDesc(e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-xl text-gray-300"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(task.id, task.status)}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="flex-1 bg-neutral-800 text-gray-300 py-2 rounded-xl"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h4 className="text-white font-semibold mb-1">
                                        {task.title}
                                    </h4>

                                    {task.description && (
                                        <p className="text-gray-400 text-sm mb-2">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap justify-between items-center gap-3 text-sm">
                                        <div className="text-gray-400">
                                            Status:{" "}
                                            <strong className="text-gray-200">
                                                {task.status}
                                            </strong>
                                            <br />
                                            Created by:{" "}
                                            <strong className="text-gray-200">
                                                {task.User?.fullName || "Unknown"}
                                            </strong>
                                            <br />
                                            Created at:{" "}
                                            <strong className="text-gray-200">
                                                {task.createdAt
                                                    ? new Date(task.createdAt).toLocaleString()
                                                    : "N/A"}
                                            </strong>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) =>
                                                    updateStatus(task.id, e.target.value)
                                                }
                                                className="bg-neutral-800 border border-neutral-700 text-gray-200 text-xs px-2 py-1.5 rounded-lg"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>

                                            <button
                                                onClick={() => startEdit(task)}
                                                className="bg-neutral-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
