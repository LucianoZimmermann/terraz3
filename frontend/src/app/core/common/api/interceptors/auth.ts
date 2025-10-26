import type { AxiosInstance } from "axios";
import { getToken } from "../config";

export function attachAuth(instance: AxiosInstance) {
  instance.interceptors.request.use((cfg) => {
    const token = getToken();
    if (!token) return cfg;

    if (cfg.headers && typeof (cfg.headers as any).set === "function") {
      (cfg.headers as any).set("Authorization", `Bearer ${token}`);
    } else {
      cfg.headers = {
        ...(cfg.headers ?? {}),
        Authorization: `Bearer ${token}`,
      } as any;
    }
    return cfg;
  });
}
