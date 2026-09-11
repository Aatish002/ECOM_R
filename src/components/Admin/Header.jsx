import { useState } from "react";
import { Bell, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchProductsQuery } from "../../Hooks/Query/Product/useSearchProductQuery";

const Header = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data: products = [] } = useSearchProductsQuery(search);

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800 bg-[#0d0d0d]">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="text-gray-400 mt-1">
          Manage your store products efficiently.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-[#1b1b1b] px-4 py-2 rounded-xl">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm placeholder:text-gray-500 text-white w-64"
            />
          </div>

          {search.trim() !== "" && (
            <div className="absolute top-14 left-0 w-full bg-[#1b1b1b] border border-gray-700 rounded-xl overflow-hidden max-h-80 overflow-y-auto z-50 shadow-lg">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      navigate(`/admin/edit/${product._id}`);
                      setSearch("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-[#2a2a2a] cursor-pointer transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />

                    <div>
                      <p className="text-white font-medium">{product.name}</p>

                      <p className="text-yellow-400 text-sm">
                        Rs. {product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 p-4 text-center">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Notification */}
        <button className="p-3 rounded-xl bg-[#1b1b1b] hover:bg-[#222] transition">
          <Bell size={20} />
        </button>

        {/* Add Product */}
        <button
          onClick={() => navigate("/admin/add-product")}
          className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>
    </header>
  );
};

export default Header;
