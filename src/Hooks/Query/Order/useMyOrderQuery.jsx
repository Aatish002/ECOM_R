import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMyOrdersQuery = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: ["myOrders"],

    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/order/get-order-by-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },

    enabled: !!token,
  });
};
