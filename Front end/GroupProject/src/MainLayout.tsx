import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { currentUser, logout } from "./stores/userStore.ts";

export default function MainLayout() {

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <nav style={{ background: "rgba(12, 11, 17, 1)", height: "80px", padding: "10px 20px", display: "flex" }}>
        <div style={{ width: "100%" }}>
          
          <button
            onClick={() => navigate("/projects")}
            style={{
              float: 'left',
              
            }}
          >
            Home
          </button>

          <button onClick={() => { logout() }} style={{ float: 'right' }}>Log out</button>
        </div>

      </nav >
      <main style={{ flex: 1, display: "flex" }}>
        <Outlet />
      </main>
    </div>
  );
}