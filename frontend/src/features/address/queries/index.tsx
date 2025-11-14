import { useQuery } from "@tanstack/react-query";
import { Address, AddressListParams } from "../types";
import { AppError } from "../../../common/api/types/AppError.ts";
import { listAddresses } from "../api/index.tsx";

export const keys = {
  all: ["address"] as const,
  list: (p?: AddressListParams) => ["address", "list", p ?? {}] as const,
  byId: (id: number) => ["address", "byId", id] as const,
};

export function useAddresses(params?: AddressListParams) {
  return useQuery<Address[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listAddresses(params, { signal }),
  });
}
