import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Task Manager 🚀</h2>
      <p>
        Manage your tasks efficiently and stay organized.
      </p>

      <Link to="/tasks">
        <button style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
          Go to Tasks Page
        </button>
      </Link>
    </div>
  );
}
