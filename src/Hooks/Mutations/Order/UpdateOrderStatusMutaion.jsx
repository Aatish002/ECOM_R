import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await axios.patch(
        `${baseUrl}/order/${orderId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};
