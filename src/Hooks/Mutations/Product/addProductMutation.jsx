import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const addProduct = async (formData) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(`${API}/add-product`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      // refresh product list
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
