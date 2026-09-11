import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { useCreateOrderMutation } from "../../../Hooks/Mutations/Order/CreateOrderMutation";

const Checkout = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const singleProduct = state?.product;
  const cartProducts = state?.products || [];

  const isSingleProduct = !!singleProduct;

  const [quantity, setQuantity] = useState(1);

  const products = isSingleProduct
    ? [
        {
          product: singleProduct,
          quantity,
        },
      ]
    : cartProducts;

  const { mutate, isPending } = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shippingAddress: "",
      city: "",
    },
  });

  useEffect(() => {
    if (!singleProduct && cartProducts.length === 0) {
      navigate("/cart");
    }
  }, []);

  if (products.length === 0) {
    return null;
  }

  const subtotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 ? 0 : 200;

  const total = subtotal + shipping;

  const increaseQuantity = () => {
    if (isSingleProduct && quantity < singleProduct.inStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (isSingleProduct && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      products: products.map((item) => ({
        product: {
          _id: item.product._id,
        },

        quantity: item.quantity,

        price: item.product.price,
      })),

      shippingAddress: data.shippingAddress,

      city: data.city,
    };

    console.log("ORDER DATA", payload);

    mutate(payload, {
      onSuccess: () => {
        alert("Order placed successfully!");

        navigate("/account");
      },

      onError: (error) => {
        alert(error.response?.data?.message || "Order failed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-500 mb-10">Checkout</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* LEFT */}

          <div
            className="
    bg-zinc-900
    border border-zinc-800
    rounded-2xl
    p-6
    "
          >
            <h2 className="text-2xl font-bold mb-6">Products</h2>

            <div className="space-y-5">
              {products.map((item) => (
                <div
                  key={item.product._id}
                  className="
        flex gap-5
        bg-black
        p-4
        rounded-xl
        "
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="
        w-28
        h-28
        object-cover
        rounded-xl
        "
                  />

                  <div>
                    <h3 className="text-xl font-bold">{item.product.name}</h3>

                    <p className="text-gray-400">Quantity: {item.quantity}</p>

                    <p className="text-yellow-400 font-bold">
                      Rs. {item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* QUANTITY ONLY BUY NOW */}

            {isSingleProduct && (
              <div className="mt-8">
                <p className="mb-3">Quantity</p>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="
      bg-zinc-800
      p-3
      rounded-full
      "
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-xl font-bold">{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="
      bg-zinc-800
      p-3
      rounded-full
      "
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8">
              <label className="block mb-2">Shipping Address</label>

              <textarea
                rows={4}
                {...register("shippingAddress", {
                  required: "Address required",
                })}
                className="
    w-full
    bg-black
    border
    border-zinc-700
    rounded-xl
    p-4
    "
              />

              {errors.shippingAddress && (
                <p className="text-red-500">{errors.shippingAddress.message}</p>
              )}
            </div>

            <div className="mt-5">
              <label className="block mb-2">City</label>

              <input
                {...register("city", {
                  required: "City required",
                })}
                className="
    w-full
    bg-black
    border
    border-zinc-700
    rounded-xl
    p-4
    "
              />

              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* RIGHT SUMMARY */}

          <div
            className="
    bg-zinc-900
    border border-zinc-800
    rounded-2xl
    p-6
    h-fit
    sticky
    top-10
    "
          >
            <h2 className="text-3xl font-bold text-yellow-400">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {products.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>

                  <span>Rs. {item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="border-zinc-700 my-6" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>Rs. {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span className="text-green-500">
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </span>
              </div>

              <div
                className="
    flex justify-between
    text-2xl
    font-bold
    border-t
    border-zinc-700
    pt-5
    "
              >
                <span>Total</span>

                <span className="text-yellow-400">Rs. {total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="
    w-full
    mt-8
    bg-yellow-500
    text-black
    font-bold
    py-4
    rounded-xl
    "
            >
              {isPending ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
