import { NavLink, Outlet } from "react-router-dom";
import { currentUser, logout } from "./stores/userStore.ts";

export default function MainLayout() {


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <nav style={{ background: "rgba(12, 11, 17, 1)", height: "80px", padding: "8px 0", display: "flex" }}>
        <div style={{ width: "100%" }}>
          <NavLink to="/projects" style={{ fontSize: "30px", marginLeft: "16px" }}>Home</NavLink>
          <button onClick={() => { logout() }} style={{ float: 'right' }}>Log out</button>
        </div>

      </nav >
      <main style={{ flex: 1, display: "flex" }}>
        <Outlet />
      </main>
    </div>
  );
}