import { useEffect, useState } from "react";
import API from "../api/axios";
import ProfileCard from "../tasks/ProfileCard";
import TaskAdd from "../tasks/TaskAdd";
import TasksList from "../tasks/TasksList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks?status=${filter}`);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-8 space-y-6 transition-colors duration-500">
      <ProfileCard user={user} />
      <TaskAdd fetchTasks={fetchTasks} />
      <TasksList
        tasks={tasks}
        fetchTasks={fetchTasks}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
