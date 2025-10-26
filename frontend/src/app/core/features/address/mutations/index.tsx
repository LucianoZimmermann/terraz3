import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, AddressCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createAddress } from "../api";
import { keys } from "../queries";

export const useCreateAddress = () => {
  const qc = useQueryClient();
  return useMutation<Address, AppError, AddressCreateDTO>({
    mutationFn: createAddress,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
