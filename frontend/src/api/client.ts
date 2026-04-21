import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const res = await apiClient.get<T>(url, config);
    return res.data as T;
  } catch (err) {
    const error = err as AxiosError<T>;

    if (error.response?.data) {
      return error.response.data as T;
    }

    throw new Error(error.message);
  }
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  try {
    const res = await apiClient.post<T>(url, data, config);
    return res.data as T;
  } catch (err) {
    const error = err as AxiosError<T>;

    if (error.response?.data) {
      return error.response.data as T;
    }

    throw new Error(error.message);
  }
}

// 新增：PATCH helper
export async function apiPatch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  try {
    const res = await apiClient.patch<T>(url, data, config);
    return res.data as T;
  } catch (err) {
    const error = err as AxiosError<T>;

    if (error.response?.data) {
      return error.response.data as T;
    }

    throw new Error(error.message);
  }
}
