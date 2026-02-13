import { useEffect, useState } from "react";
import API from "../api/axios";
import ProfileCard from "../tasks/ProfileCard";
import TaskAdd from "../tasks/TaskAdd";
import TasksList from "../tasks/TasksList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchTasks = async (customPage = page) => {
    try {
      const { data } = await API.get("/tasks", {
        params: {
          page: customPage,
          limit: 5,
          status: filter,
          search: search 
        }
      });

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks(1);  
    }, 500);

    return () => clearTimeout(delay);
  }, [filter, search]);  

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-8 space-y-6 transition-colors duration-500">
      <ProfileCard user={user} />

      <TaskAdd fetchTasks={() => fetchTasks(1)} />

      <TasksList
        tasks={tasks}
        fetchTasks={() => fetchTasks(page)}
        filter={filter}
        setFilter={setFilter}
        search={search}        
        setSearch={setSearch}   
      />

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => fetchTasks(page - 1)}
          className="px-4 py-2 bg-neutral-800 rounded-xl text-white disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchTasks(page + 1)}
          className="px-4 py-2 bg-neutral-800 rounded-xl text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
