import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const fetchSearchProducts = async (query) => {
  const res = await axios.get(API, {
    params: {
      search: query,
      page: 1,
      perPage: 50,
    },
  });

  return res.data.data;
};

export const useSearchProductsQuery = (query) => {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => fetchSearchProducts(query),
    enabled: query.trim() !== "",
  });
};
