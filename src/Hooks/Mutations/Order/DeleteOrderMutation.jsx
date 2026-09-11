import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("accessToken");

  return useMutation({
    mutationFn: async (orderId) => {
      const res = await axios.delete(`${baseUrl}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
