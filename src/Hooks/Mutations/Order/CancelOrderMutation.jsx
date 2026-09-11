import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return useMutation({
    mutationFn: async (orderId) => {
      const token = localStorage.getItem("accessToken");

      console.log("Cancelling order:", orderId);

      const res = await axios.patch(
        `${baseUrl}/order/${orderId}/cancel-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Cancel response:", res.data);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });
    },

    onError: (error) => {
      console.log("Cancel Order Error:", error.response?.data || error.message);
    },
  });
};
