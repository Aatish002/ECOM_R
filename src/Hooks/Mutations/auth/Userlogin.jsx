import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/auth/login`, data);

      return response.data;
    },
  });
};
