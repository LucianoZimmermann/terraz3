import axios from "axios";
import { apiConfig } from "./config";
import { attachAuth } from "./interceptors/auth";
import { attachErrorNormalizer } from "./interceptors/error";

export const http = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.jsonHeaders,
  withCredentials: false,
});

attachAuth(http);
attachErrorNormalizer(http);
