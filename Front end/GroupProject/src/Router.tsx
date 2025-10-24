import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router