import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  return useMutation({
    mutationFn: async (orderData) => {
      const res = await axios.post(`${baseUrl}/order/create-order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myOrders"],
      });
    },
  });
};
