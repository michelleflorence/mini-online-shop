import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
