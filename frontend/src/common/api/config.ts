export const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 15_000,
  jsonHeaders: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const tokenStorageKey = "auth_token";

export const getToken = () => {
  try {
    return localStorage.getItem(tokenStorageKey);
  } catch {
    return null;
  }
};
