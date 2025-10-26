import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, staleTime: 60_000, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  },
});
