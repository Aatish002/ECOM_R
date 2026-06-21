import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function get(url, config) {
  return api.get(url, config);
}

export async function post(url, data, config) {
  return api.post(url, data, config);
}

export async function patch(url, data, config) {
  return api.patch(url, data, config);
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
