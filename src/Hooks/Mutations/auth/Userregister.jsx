import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/auth/register`, data);
      return response.data;
    },
  });
};
