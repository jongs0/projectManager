import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import ProjectList from "./pages/ProjectList.tsx";
import { currentUser } from "./stores/userStore.ts";
import Login from "./pages/login.tsx";
import Project from "./pages/Project.tsx";
import Task from "./pages/Task.tsx";

function Router() {
  
  if (currentUser().username == "") return (<Login/>)

  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout  />}>
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId" element={<Project/>} />
          <Route path="projects/:projectId/task/:taskId" element={<Task/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router