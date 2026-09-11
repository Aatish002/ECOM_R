import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const token = localStorage.getItem("accessToken");
  const API = `${import.meta.env.VITE_BASE_URL}/auth`;

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.patch(
        `${API}/cart/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCart = cart.filter((item) =>
    selectedItems.includes(item.product._id),
  );

  const subtotal = selectedCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 ? 0 : 200;

  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (selectedCart.length === 0) {
      return;
    }

    navigate("/checkout", {
      state: {
        products: selectedCart,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <h1 className="text-center text-5xl font-[cursive] text-yellow-400 mb-12">
        YOUR CART
      </h1>

      <div className="max-w-7xl mx-auto px-6">
        {cart.length === 0 ? (
          <h2 className="text-center text-gray-400 text-xl">Cart is empty</h2>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  onClick={() => toggleSelect(item.product._id)}
                  className={`
              flex bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer
              border border-zinc-800

              ${
                selectedItems.includes(item.product._id)
                  ? "ring-2 ring-yellow-500"
                  : ""
              }

              `}
                >
                  <img
                    src={item.product.image}
                    className="w-48 h-48 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-2xl font-bold">{item.product.name}</h2>

                    <p className="text-yellow-400 font-bold mt-3">
                      Rs. {item.product.price}
                    </p>

                    <div className="flex gap-4 mt-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.product._id, item.quantity - 1);
                        }}
                        className="bg-zinc-800 px-3 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.product._id, item.quantity + 1);
                        }}
                        className="bg-zinc-800 px-3 rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.product._id);
                        }}
                        className="text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 h-fit">
              <h2 className="text-3xl font-bold text-yellow-400">Summary</h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>Rs. {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span className="text-yellow-400">Rs. {total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="
          w-full mt-6 py-3 rounded-xl
          bg-yellow-500 text-black font-bold
          disabled:bg-gray-700
          "
              >
                Checkout Selected ({selectedItems.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
