import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.log("Wishlist Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/auth/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/cart/add`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Added To Cart");
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-[cursive] tracking-widest text-yellow-400">
            MY WISHLIST
          </h1>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="max-w-xl mx-auto bg-[#111] border border-gray-800 rounded-3xl p-12 text-center">
            <Heart size={70} className="mx-auto text-gray-600 mb-5" />

            <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>

            <p className="text-gray-400">Start adding products you love.</p>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="flex flex-wrap justify-center gap-8">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="
                    w-[300px]
                    bg-[#111]
                    rounded-3xl
                    overflow-hidden
                    border border-gray-800
                    hover:border-yellow-400
                    hover:-translate-y-2
                    transition-all duration-300
                    shadow-xl
                    cursor-pointer
                  "
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product._id);
                      }}
                      className="
                        absolute top-3 right-3
                        bg-red-500
                        p-2 rounded-full
                        hover:scale-110
                        transition
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold line-clamp-1">
                      {product.name}
                    </h2>

                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-yellow-400 text-xl font-bold">
                        Rs. {product.price}
                      </span>

                      <span
                        className={`text-sm font-medium ${
                          product.inStock > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {product.inStock > 0 ? "In Stock" : "Out Of Stock"}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      disabled={product.inStock === 0}
                      className="
                        mt-5
                        w-full
                        bg-yellow-400
                        text-black
                        py-3
                        rounded-xl
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-yellow-300
                        transition
                        disabled:bg-gray-700
                        disabled:text-gray-400
                      "
                    >
                      <ShoppingBag size={18} />
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Count */}
            <div className="text-center mt-14 text-gray-400">
              {wishlist.length} item
              {wishlist.length !== 1 ? "s" : ""} saved
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
