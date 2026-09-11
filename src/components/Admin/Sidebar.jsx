import { Package, Users, ShoppingCart, LogOut, Shield } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const menuItems = [
    {
      title: "Products",
      icon: Package,
      path: "/admin",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
    },
  ];

  const logout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `${baseUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log("Logout Error:", err.message);
    }

    // Clear Local Storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Update Navbar
    window.dispatchEvent(new Event("auth-change"));

    // Redirect Home
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-[#111] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-1">
          <Shield className="text-yellow-400" size={32} />
          <img className="h-10 w-auto" src="/logo.png" alt="logo" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition ${
                active
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-[#1c1c1c]"
              }`}
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-800 p-5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 text-red-400 hover:text-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
