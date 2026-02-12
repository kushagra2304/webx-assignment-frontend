import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-[91vh] flex items-center justify-center bg-gradient-to-br from-black via-neutral-950 to-neutral-900 px-6">
      
      <div className="max-w-xl w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-10 text-center shadow-xl shadow-black/50">
        
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Welcome to the Task Manager
        </h2>

        <p className="text-gray-400 text-sm mb-8">
          Manage your tasks efficiently, stay organized, and boost your productivity.
        </p>

        <Link to="/tasks">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
                             text-white px-8 py-3 rounded-full font-semibold text-sm 
                             shadow-lg shadow-indigo-900/40 
                             transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03]">
            Go to Tasks Page
          </button>
        </Link>

      </div>
    </div>
  );
}
