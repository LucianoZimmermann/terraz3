import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, AddressCreateDTO } from "../types";
import { AppError } from "../../../types/AppError";
import { createAddress } from "../api";
import { qk } from "../../../query/keys";

export const useCreateAddress = () => {
  const qc = useQueryClient();
  return useMutation<Address, AppError, AddressCreateDTO>({
    mutationFn: createAddress,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.address.all }),
  });
};
