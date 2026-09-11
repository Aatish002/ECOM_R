import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("products");

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
