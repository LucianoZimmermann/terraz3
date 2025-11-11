import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, AddressCreateDTO, AddressUpdateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createAddress, updateAddress } from "../api";
import { keys } from "../queries";

export const useCreateAddress = () => {
  const qc = useQueryClient();
  return useMutation<Address, AppError, AddressCreateDTO>({
    mutationFn: createAddress,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};

export const useUpdateAddress = () => {
  const qc = useQueryClient();
  return useMutation<Address, AppError, { id: number; body: AddressUpdateDTO }>(
    {
      mutationFn: ({ id, body }) => updateAddress(id, body),
      onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    },
  );
};
