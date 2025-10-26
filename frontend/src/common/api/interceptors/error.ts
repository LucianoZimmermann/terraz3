import type { AxiosError, AxiosInstance } from "axios";
import type { AppError } from "../types/AppError";

function toAppError(err: AxiosError): AppError {
  const status = err.response?.status;
  const data = err.response?.data as any;
  return {
    status,
    code: data?.code ?? err.code,
    message:
      data?.message ??
      err.message ??
      (status ? `HTTP ${status}` : "Erro de rede"),
    details: data ?? err.response,
    cause: err,
  };
}

export function attachErrorNormalizer(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (r) => r,
    (err: AxiosError) => Promise.reject(toAppError(err)),
  );
}
