import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Smile } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = res.data.user || res.data.data;
      setUser(userData);
    } catch (err) {
      console.log("ME ERROR:", err.message);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    window.addEventListener("auth-change", fetchUser);

    return () => {
      window.removeEventListener("auth-change", fetchUser);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      console.log("logout error:", err.message);
    }

    localStorage.removeItem("accessToken");
    setUser(null);
    setIsDropdownOpen(false);

    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-yellow-500 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 gap-4">
        {/* LOGO */}
        <div className="flex items-center">
          <img className="h-10 w-auto" src="/logo.png" alt="logo" />
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-300"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-300"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* AUTH SECTION */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 text-yellow-200 hover:text-yellow-400 transition"
            >
              {/* Avatar */}
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-yellow-400"
                />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <Smile className="w-8 h-8 text-yellow-200" />
                </div>
              )}

              <span className="font-semibold text-sm sm:text-base">
                {user?.userName || user?.name}
              </span>
            </button>

            {/* DROPDOWN */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-black border border-yellow-500 rounded-lg overflow-hidden shadow-lg z-50">
                <Link
                  to="/account"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 text-yellow-200 hover:bg-yellow-500 hover:text-black transition"
                >
                  Manage Account
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 text-yellow-200 hover:bg-yellow-500 hover:text-black transition"
                >
                  My Wishlist
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 text-yellow-200 hover:bg-yellow-500 hover:text-black transition"
                >
                  Cart
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center border border-yellow-400/70 bg-black overflow-hidden rounded-md">
            <Link
              to="/login"
              className="px-6 py-2 text-yellow-200 hover:bg-yellow-400 hover:text-black transition"
            >
              Login
            </Link>

            <div className="w-px h-5 bg-yellow-400/40" />

            <Link
              to="/register"
              className="px-6 py-2 text-yellow-200 hover:bg-yellow-400 hover:text-black transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
