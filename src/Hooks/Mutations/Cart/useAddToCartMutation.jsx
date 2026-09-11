import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/auth`;

const addToCart = async (productId) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(
    `${API}/cart/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      // Automatically refresh the cart query
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
