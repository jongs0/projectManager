import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="container">
      {/* <img
        src="/TBD"
        alt="TBD"
        style={{ width: "100%", height: "auto" }}
      /> */}
      
      <header>
        <h1>WIP</h1>
      </header>
      <Outlet />
    </main>
  );
}