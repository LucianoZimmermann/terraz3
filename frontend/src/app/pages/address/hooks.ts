import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../core/query/keys";
import type { AppError } from "../../core/types/AppError";
import {
  Address,
  AddressCreateDTO,
  AddressListParams,
} from "../../core/api/address/types.ts";
import { createAddress, listAddresses } from "../../core/api/address";

export const useAddresses = (params?: AddressListParams) =>
  useQuery<Address[], AppError>({
    queryKey: qk.address.list(params),
    queryFn: ({ signal }) => listAddresses(params, { signal }),
  });

export const useCreateAddress = () => {
  const qc = useQueryClient();
  return useMutation<Address, AppError, AddressCreateDTO>({
    mutationFn: createAddress,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.address.all }),
  });
};
