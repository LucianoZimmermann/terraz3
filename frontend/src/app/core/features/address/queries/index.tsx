import { useQuery } from "@tanstack/react-query";
import { Address, AddressListParams } from "../types";
import { AppError } from "../../../types/AppError";
import { listAddresses } from "../api/index.tsx";

export const qk = {
  all: ["address"] as const,
  list: (p?: AddressListParams) => ["address", "list", p ?? {}] as const, // p padronizado
  byId: (id: number | string) => ["address", "byId", id] as const,
} as const;

export function useAddresses(params?: AddressListParams) {
  return useQuery<Address[], AppError>({
    queryKey: qk.list(params),
    queryFn: ({ signal }) => listAddresses(params, { signal }),
  });
}
