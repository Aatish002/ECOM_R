import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const deleteProduct = async (id) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
