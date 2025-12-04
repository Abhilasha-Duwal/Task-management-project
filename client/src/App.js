import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";
import Task from "./pages/Task";
import PublicRoute from "./components/PublicRoute";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              {" "}
              <Login />{" "}
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <Task />
            </AuthGuard>
          }
        />
        <Route
          path="/tasks/create"
          element={
            <AuthGuard>
              <CreateTask />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/tasks/edit/:id"
          element={
            <AuthGuard>
              <EditTask />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
