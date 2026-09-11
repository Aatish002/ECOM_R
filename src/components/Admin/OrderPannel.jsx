import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../Hooks/Mutations/Order/UpdateOrderStatusMutaion";
import { useDeleteOrderMutation } from "../../Hooks/Mutations/Order/DeleteOrderMutation";
import { useAllOrdersQuery } from "../../Hooks/Query/Order/useAllOrderQuery";

const OrdersPanel = () => {
  const { data: orders = [], isLoading } = useAllOrdersQuery();

  const updateMutation = useUpdateOrderStatusMutation();
  const deleteMutation = useDeleteOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const updateStatus = (orderId) => {
    const status = selectedStatus[orderId];

    if (!status) return;

    updateMutation.mutate({
      orderId,
      status,
    });
  };

  const deleteOrder = (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(orderId);
  };

  if (isLoading) {
    return <div className="text-yellow-500 text-xl">Loading orders...</div>;
  }

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-10">
      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-green-500/10">
          <ShoppingCart size={32} className="text-green-400" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">Orders</h2>

          <p className="text-gray-400">Manage customer orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="border border-dashed border-gray-700 rounded-xl py-20 text-center">
          <h3 className="text-xl text-gray-300">No Orders</h3>
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
                className="bg-black border border-gray-800 rounded-2xl p-6"
              >
                {/* TOP */}

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-500">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>

                    <p className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`
          px-4 py-2 rounded-full font-bold

          ${
            order.status === "PENDING"
              ? "bg-yellow-500 text-black"
              : order.status === "DELIVERED"
                ? "bg-green-500 text-black"
                : order.status === "CANCELLED"
                  ? "bg-red-600 text-white"
                  : "bg-blue-500 text-white"
          }

          `}
                  >
                    {order.status}
                  </span>
                </div>

                {/* CUSTOMER */}

                <div className="mt-6">
                  <h4 className="text-yellow-500 font-semibold">Customer</h4>

                  <p>{order.createdBy?.userName || "Unknown"}</p>

                  <p className="text-gray-500">
                    {order.createdBy?.email || "No email"}
                  </p>
                </div>

                {/* PRODUCTS */}

                <div className="mt-6">
                  <h4 className="text-yellow-500 font-semibold mb-3">
                    Products
                  </h4>

                  {order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="flex justify-between items-center bg-[#111] p-3 rounded-xl mb-3"
                    >
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-semibold">{product.name}</p>

                          <p className="text-gray-500">
                            Qty: {product.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-yellow-500 font-bold">
                        Rs. {product.price * product.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ADDRESS */}

                <div className="mt-6">
                  <h4 className="text-yellow-500 font-semibold">
                    Shipping Address
                  </h4>

                  <p>{order.shippingAddress}</p>

                  <p className="text-gray-500">{order.city}</p>
                </div>

                {/* TOTAL */}

                <div className="text-right mt-5">
                  <h2 className="text-3xl text-yellow-500 font-bold">
                    Rs. {total}
                  </h2>
                </div>

                {/* ACTIONS */}

                <div className="mt-6 flex justify-end gap-3">
                  <select
                    value={selectedStatus[order._id] || order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="
        bg-zinc-900
        text-white
        font-sans
        text-sm
        border
        border-gray-700
        px-4
        py-2
        rounded-lg
        outline-none
        cursor-pointer
        hover:border-yellow-500
        "
                  >
                    <option value="PENDING">PENDING</option>

                    <option value="PROCESSING">PROCESSING</option>

                    <option value="SHIPPED">SHIPPED</option>

                    <option value="DELIVERED">DELIVERED</option>

                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <button
                    onClick={() => updateStatus(order._id)}
                    disabled={updateMutation.isPending}
                    className="
        bg-yellow-500
        text-black
        px-5
        py-2
        rounded-lg
        font-bold
        hover:bg-yellow-400
        disabled:opacity-50
        "
                  >
                    {updateMutation.isPending ? "Updating..." : "Update"}
                  </button>

                  <button
                    onClick={() => deleteOrder(order._id)}
                    disabled={deleteMutation.isPending}
                    className="
        flex
        items-center
        gap-2
        bg-red-600
        px-5
        py-2
        rounded-lg
        font-bold
        hover:bg-red-700
        disabled:opacity-50
        "
                  >
                    <Trash2 size={18} />

                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
