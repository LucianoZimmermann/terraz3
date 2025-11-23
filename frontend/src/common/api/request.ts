import type { AxiosRequestConfig } from "axios";
import { http } from "./client";

type Cfg = Omit<AxiosRequestConfig, "url" | "method" | "data"> & {
  signal?: AbortSignal;
};

export async function get<T>(url: string, cfg?: Cfg): Promise<T> {
  const { data } = await http.get<T>(url, cfg);
  return data;
}

export async function del<T>(url: string, cfg?: Cfg): Promise<T> {
  const { data } = await http.delete<T>(url, cfg);
  return data;
}

export async function post<T, B = unknown>(
  url: string,
  body: B,
  cfg?: Cfg,
): Promise<T> {
  const { data } = await http.post<T>(url, body, cfg);
  return data;
}

export async function put<T, B = unknown>(
  url: string,
  body: B,
  cfg?: Cfg,
): Promise<T> {
  const { data } = await http.put<T>(url, body, cfg);
  return data;
}

export async function patch<T, B = unknown>(
  url: string,
  body: B,
  cfg?: Cfg,
): Promise<T> {
  const { data } = await http.patch<T>(url, body, cfg);
  return data;
}

export function withAbortController() {
  const controller = new AbortController();
  return { signal: controller.signal, cancel: () => controller.abort() };
}
