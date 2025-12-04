import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AuthGuard from "./components/AuthGuard";
import Task from "./pages/Task/Task";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
   <BrowserRouter>
      <Routes>
         {/* Public routes */}
        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <Task/>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
