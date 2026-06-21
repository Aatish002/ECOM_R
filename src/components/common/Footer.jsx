import { NavLink } from "react-router-dom";
import { Camera, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-yellow-500/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src="/logo.png" alt="logo" className="h-10" />

            <p className="mt-4 text-sm text-gray-400">
              Fresh apples delivered straight from nature with care.
            </p>

            <div className="flex items-center gap-2 mt-4 text-pink-500 hover:text-pink-400 cursor-pointer transition">
              <Camera className="w-5 h-5" />
              <span className="text-sm">Instagram</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Navigation</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "text-gray-400 hover:text-yellow-400 transition"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "text-gray-400 hover:text-yellow-400 transition"
                  }
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "text-gray-400 hover:text-yellow-400 transition"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Location</h3>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-yellow-500" />
              Kathmandu, Nepal
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Fresh Orchard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
