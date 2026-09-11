import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSingleOrderQuery = (orderId) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: ["order", orderId],

    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },

    enabled: !!orderId && !!token,
  });
};
