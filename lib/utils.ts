import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = "http://dev-server.glitexsolutions.co.ke:8035/api/v1";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");

    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
