import axios, { AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

// 幫自己封一層，令 get<T> 真係回 T（唔係 unknown）
export function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  return apiClient.get<T>(url, config) as Promise<T>;
}
