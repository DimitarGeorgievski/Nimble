import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Login } from "./Pages/Login/Login";
import { ErrorPage } from "./Pages/Error/Error";
import { tokenService } from "./services/tokenService";
import { ProtectedRoute } from "./Pages/ProtectedRoute/ProtectedRoute";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Staff } from "./Pages/Staff/Staff";
import { MainLayout } from "./Pages/MainLayout/MainLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          tokenService.getAccessToken() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
        </Route>
      </Route>
      <Route
        path="/"
        element={
          tokenService.getAccessToken() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
