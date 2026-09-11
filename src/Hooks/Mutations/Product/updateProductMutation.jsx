import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_URL}/product`;

const updateProduct = async ({ id, formData }) => {
  const token = localStorage.getItem("accessToken");

  if (!id) throw new Error("Product ID is required");

  const res = await axios.patch(
    `${API}/update-product/${id}`, // ✅ FIXED ROUTE
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data.data;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: (data, variables) => {
      // refresh single product
      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });

      // refresh product list
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
