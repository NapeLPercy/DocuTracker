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
import { useAuth } from "./context/AuthContext";

import PersonellDashboard from "./components/PersonellDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Metrics from "./components/Metrics";
import Home from "./components/Home";
import AddBatch from "./components/AddBatch";

import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthFlow />} />

        {/* all logged-in users */}
        <Route element={<RequireAuth />}>
          <Route path="/auth" element={<AppShell />}>
            {user?.role === "MANAGER" || user?.role === "RUNNER" ? (
              <Route index element={<AdminDashboard />} />
            ) : (
              <Route index element={<PersonellDashboard />} />
            )}

            {/* manager + runner only */}
            <Route
              element={<RequireRole allowedRoles={["MANAGER", "RUNNER"]} />}
            >
              <Route path="manager/team/add" element={<AddUser />} />
              <Route path="manager/users" element={<ViewUsers />} />
              <Route path="manager/task/add" element={<AssignTask />} />
              <Route path="manager/reports" element={<Reports />} />
              <Route path="manager/tasks" element={<ViewAllTasks />} />
              <Route path="manager/dashboard" element={<AdminDashboard />} />
              <Route path="manager/metrics" element={<Metrics />} />
              <Route path="manager/batch/add" element={<AddBatch/>}/>
            </Route>

            {/* personell only */}
            <Route
              element={
                <RequireRole
                  allowedRoles={[
                    "QC",
                    "CREATOR",
                    "ASSEMBLER",
                    "SCANNER",
                    "TECH-SUPPORT",
                    "INDEXER",
                  ]}
                />
              }
            >
              <Route path="personell/tasks" element={<MyTasks />} />
              <Route path="personell/reports" element={<Reports />} />
              <Route
                path="personell/dashboard"
                element={<PersonellDashboard />}
              />
              <Route path="personell/metrics" element={<Metrics />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
