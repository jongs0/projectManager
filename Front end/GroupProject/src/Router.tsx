import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import ProjectList from "./pages/ProjectList.tsx";
import { currentUser } from "./stores/userStore.ts";
import Login from "./pages/login.tsx";
import Project from "./pages/Project.tsx";
import Task from "./pages/Task.tsx";
import Team from "./pages/Team.tsx";

function Router() {
  
  const user = currentUser();

  return (
    
    <BrowserRouter>
    <Routes>
    
    {!user.email && (
      <Route path="*" element={<Login />} />
    )}
        
    {user.email && (
      <Route element={<MainLayout  />}>
      <Route path="projects" element={<ProjectList />} />
      <Route path="projects/:projectId" element={<Project/>} />
      <Route path="projects/:projectId/task/:taskId" element={<Task/>} />
      <Route path="teams/:teamId" element={<Team/>} />
      <Route path="projects/:projectId/team/:teamId" element={<Team />} />
      </Route>
    )}
    </Routes>
    </BrowserRouter>
  );
}

export default Router