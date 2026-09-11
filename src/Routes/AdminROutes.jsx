import { Navigate } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <AdminLayout />;
};

export default AdminRoute;
