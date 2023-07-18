import { Navigate, Outlet } from "react-router-dom";

export function AdminRoutes() {
  const isLoggedIn = localStorage.getItem("currentUser");
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
