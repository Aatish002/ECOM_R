import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useSingleProductQuery } from "../../../Hooks/Query/Product/singleProductQuerry";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const [wishLoading, setWishLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: product, isLoading: loading } = useSingleProductQuery(id);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        if (!token) return;

        const res = await axios.get(`${baseUrl}/auth/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const exists = res.data.wishlist?.some(
          (item) => item._id.toString() === id,
        );

        setIsWishlisted(exists);
      } catch (error) {
        console.log(error);
      }
    };

    checkWishlist();
  }, [id, token, baseUrl]);

  const addToCart = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      setAdding(true);

      await axios.post(
        `${baseUrl}/auth/cart/add`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const toggleWishlist = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      setWishLoading(true);

      if (isWishlisted) {
        await axios.delete(`${baseUrl}/auth/wishlist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsWishlisted(false);
      } else {
        await axios.post(
          `${baseUrl}/auth/wishlist`,
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsWishlisted(true);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Wishlist action failed");
    } finally {
      setWishLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    navigate("/checkout", {
      state: {
        product,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        {/* IMAGE */}
        <div className="p-6 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[500px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-yellow-500">{product.name}</h1>

          <p className="text-gray-400 mt-4">{product.description}</p>

          <p className="text-2xl mt-6 font-bold">Rs. {product.price}</p>

          <p
            className={`mt-3 font-semibold ${
              product.inStock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock > 0
              ? `In Stock (${product.inStock})`
              : "Out of Stock"}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            {/* CART */}
            <button
              onClick={addToCart}
              disabled={product.inStock <= 0 || adding}
              className="
                bg-yellow-500
                text-black
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-yellow-400
                transition
                disabled:bg-gray-600
              "
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            {/* WISHLIST */}
            <button
              onClick={toggleWishlist}
              disabled={wishLoading}
              className={`
                flex items-center gap-2
                px-6 py-3
                rounded-xl
                font-semibold
                transition
                ${wishLoading ? "opacity-70 cursor-not-allowed" : ""}
                ${
                  isWishlisted
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                }
              `}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />

              {wishLoading
                ? "Loading..."
                : isWishlisted
                  ? "Wishlisted"
                  : "Wishlist"}
            </button>

            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              disabled={product.inStock <= 0}
              className="
                border
                border-yellow-500
                text-yellow-500
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-yellow-500
                hover:text-black
                transition
                disabled:border-gray-600
                disabled:text-gray-600
              "
            >
              Buy Now
            </button>
          </div>

          {/* CART MESSAGE */}
          {added && (
            <p className="text-green-500 mt-4 font-semibold">Added to cart ✔</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
