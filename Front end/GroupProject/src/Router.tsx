import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import ProjectList from "./pages/ProjectList.tsx";
import { currentUser } from "./stores/userStore.ts";
import Login from "./pages/login.tsx";
import Project from "./pages/Project.tsx";

function Router() {
  
  if (currentUser().username == "") return (<Login/>)

  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout  />}>
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId" element={<Project/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router