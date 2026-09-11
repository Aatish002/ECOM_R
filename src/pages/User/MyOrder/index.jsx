import { useNavigate } from "react-router-dom";
import { useMyOrdersQuery } from "../../../Hooks/Query/Order/useMyOrderQuery";
import { useCancelOrderMutation } from "../../../Hooks/Mutations/Order/CancelOrderMutation";

const MyOrders = () => {
  const navigate = useNavigate();

  const { data: orders = [], isLoading, refetch } = useMyOrdersQuery();

  const cancelMutation = useCancelOrderMutation();

  const handleCancel = async (id) => {
    console.log("handleCancel started:", id);

    const confirmed = true; // temporary test

    if (!confirmed) {
      console.log("Cancel rejected by user");
      return;
    }

    console.log("Calling mutation...");

    try {
      await cancelMutation.mutateAsync(id);
      await refetch();

      console.log("Order cancelled");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-2xl text-yellow-500 font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold text-yellow-500">My Orders</h1>

            <p className="text-gray-400 mt-2">
              Track and manage all of your orders.
            </p>
          </div>

          <button
            onClick={() => navigate("/collections/all")}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl py-24 text-center">
            <h2 className="text-3xl font-bold text-yellow-500">
              No Orders Yet
            </h2>

            <p className="text-gray-400 mt-3">
              Looks like you haven't purchased anything yet.
            </p>

            <button
              onClick={() => navigate("/collections/all")}
              className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const total = order.products.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

              return (
                <div
                  key={order._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg"
                >
                  {/* TOP BAR */}
                  <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-800">
                    <div>
                      <h2 className="text-2xl font-bold text-yellow-500">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>

                      <p className="text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full font-semibold ${
                        order.status === "PENDING"
                          ? "bg-yellow-500 text-black"
                          : order.status === "DELIVERED"
                            ? "bg-green-500 text-white"
                            : order.status === "COMPLETED"
                              ? "bg-blue-500 text-white"
                              : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* PRODUCTS */}
                  <div className="p-8 space-y-6">
                    {order.products.map((product) => (
                      <div
                        key={product.productId}
                        className="flex items-center justify-between border-b border-zinc-800 pb-6"
                      >
                        <div className="flex items-center gap-6">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-28 h-28 rounded-xl object-cover bg-black"
                          />

                          <div>
                            <h3 className="text-2xl font-semibold">
                              {product.name}
                            </h3>

                            <p className="text-gray-400 mt-2">
                              Quantity: {product.quantity}
                            </p>

                            <p className="text-yellow-500 font-bold text-xl mt-2">
                              Rs. {product.price}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-gray-400">Total</p>

                          <p className="text-2xl font-bold text-yellow-500">
                            Rs. {product.price * product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* SHIPPING & TOTAL */}
                    <div className="grid md:grid-cols-2 gap-8 pt-2">
                      <div>
                        <h3 className="text-yellow-500 font-semibold text-lg mb-3">
                          Shipping Address
                        </h3>

                        <p className="text-gray-300">{order.shippingAddress}</p>

                        <p className="text-gray-500 mt-1">{order.city}</p>
                      </div>

                      <div className="flex flex-col items-end justify-center">
                        <p className="text-gray-400">Order Total</p>

                        <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                          Rs. {total}
                        </h2>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-4 pt-6">
                      {order.status === "PENDING" && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          disabled={cancelMutation.isPending}
                          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold disabled:opacity-50"
                        >
                          {cancelMutation.isPending
                            ? "Cancelling..."
                            : "Cancel Order"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
