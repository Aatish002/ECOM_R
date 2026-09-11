import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axios.get(API, {
    params: {
      page: pageParam,
      perPage: 6,
    },
  });

  return res.data;
};

export const useProductsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};
