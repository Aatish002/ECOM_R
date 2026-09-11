import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAddToCartMutation } from "../../Hooks/Mutations/Cart/useAddToCartMutation";

const Cart = ({ id, name, description, price, image, inStock }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [added, setAdded] = useState(false);

  const { mutate, isPending } = useAddToCartMutation();

  const addToCart = (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });

      return;
    }

    mutate(id, {
      onSuccess: () => {
        setAdded(true);

        setTimeout(() => {
          setAdded(false);
        }, 1500);
      },

      onError: (error) => {
        console.log(error.response?.data || error);
      },
    });
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="
        group relative bg-gradient-to-b from-[#111] to-black
        rounded-2xl overflow-hidden shadow-xl
        cursor-pointer border border-gray-800
        transform transition duration-300
        hover:scale-[1.03] hover:border-yellow-400
        hover:shadow-[0_0_25px_rgba(250,204,21,0.25)]
      "
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        <div
          className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-semibold ${
            inStock > 0 ? "bg-green-500 text-black" : "bg-red-500 text-white"
          }`}
        >
          {inStock > 0 ? "In Stock" : "Out of Stock"}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-white">{name}</h2>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>

        <div className="flex justify-between mt-4">
          <p className="text-yellow-400 font-bold">Rs. {price}</p>

          <p className="text-xs text-gray-500">
            {inStock === 0 ? "Sold out" : inStock < 6 ? `${inStock} left` : ""}
          </p>
        </div>

        <button
          onClick={addToCart}
          disabled={inStock <= 0 || isPending}
          className="
            w-full mt-5 py-3 rounded-xl font-bold
            bg-yellow-400 text-black
            hover:scale-105 transition
            disabled:bg-gray-700 disabled:text-gray-400
          "
        >
          {isPending ? "Adding..." : "Add To Cart"}
        </button>

        {added && (
          <p className="text-green-500 text-sm mt-3 font-semibold">
            Added to cart ✔
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
