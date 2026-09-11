import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const menu = [
    { id: "profile", label: "My Profile" },
    { id: "orders", label: "My Orders" },
    { id: "wishlist", label: "Wishlist" },
  ];

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${baseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data.user || res.data.data;
        setUser(userData);
      } catch (err) {
        console.log(err.message);
        setUser(null);
      }
    };

    fetchUser();
  }, [baseUrl, token]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // save and reload
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/auth/change-user-name`,
        {
          userName: user.userName,
          phoneNo: user.phoneNo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Update successful:", res.data);

      // reload page after save
      window.location.reload();
    } catch (err) {
      console.log("Update failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4">
        {/* SIDEBAR */}
        <div className="w-full md:w-64 bg-zinc-900/40 rounded-xl p-4">
          <h3 className="text-yellow-500 font-bold font-[cursive] text-[30px]">
            Hello, {user?.userName || "User"}
          </h3>

          <p className="text-gray-500 text-xs font-bold mt-2 mb-3">
            Manage My Account
          </p>

          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === "wishlist") {
                  navigate("/wishlist");
                } else if (item.id === "orders") {
                  navigate("/my-orders");
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`p-2 rounded-lg cursor-pointer ${
                activeTab === item.id
                  ? "bg-yellow-500 text-black font-bold"
                  : "text-gray-300 hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-zinc-900/40 rounded-xl p-5">
          <h2 className="text-yellow-500 text-[40px] font-[cursive] font-bold mb-5">
            My Profile
          </h2>

          {/* PROFILE */}
          {activeTab === "profile" && user && (
            <div className="max-w-3xl space-y-4">
              {/* USERNAME */}
              <div>
                <p className="text-yellow-500 text-sm mb-1">Username</p>

                <input
                  name="userName"
                  value={user?.userName || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black/60 text-white outline-none"
                />
              </div>

              {/* MOBILE */}
              <div>
                <p className="text-yellow-500 text-sm mb-1">Mobile</p>

                <input
                  name="phoneNo"
                  value={user?.phoneNo || ""}
                  onChange={handleChange}
                  className="w-full md:w-1/2 p-2 rounded-lg bg-black/60 text-white outline-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => navigate("/change-password")}
                  className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                >
                  Set Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
