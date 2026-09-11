import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const getSingleProduct = async (id) => {
  if (!id) throw new Error("Product ID is required");

  const res = await axios.get(`${API}/${id}`);

  return res.data?.data;
};

export const useSingleProductQuery = (id) => {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () => getSingleProduct(id),

    enabled: Boolean(id),

    retry: 1, // prevents infinite retries on bad id

    staleTime: 1000 * 60, // 1 min cache (optional but good)
  });
};
