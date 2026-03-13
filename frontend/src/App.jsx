import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthFlow from "./pages/AuthFlow";
import AppShell from "./components/AppShell";
import AddUser from "./components/AddUser";
import ViewUsers from "./components/ViewUsers";
import AssignTask from "./components/AssignTask";
import MyTasks from "./components/MyTasks";
import Reports from "./components/Reports";
import ViewAllTasks from "./components/ViewAllTasks";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthFlow />} />

        <Route path="/auth" element={<AppShell />}>
          <Route index element={<AssignTask />} />
          <Route path="manager/team/add" element={<AddUser />} />
          <Route path="manager/users" element={<ViewUsers />} />
          <Route path="manager/task/add" element={<AssignTask />} />
          <Route path="manager/reports" element={<Reports />} />
          <Route path="manager/tasks" element={<ViewAllTasks/>}/>
          {/*for workers */}
          <Route path="personell/tasks" element={<MyTasks />} />
          <Route path="personell/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
