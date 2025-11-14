import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThirdParty, ThirdPartyCreateDTO, ThirdPartyUpdateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createThirdParty, deleteThirdParty, updateThirdParty } from "../api";
import { keys } from "../queries";

export const useCreateThirdParty = () => {
  const qc = useQueryClient();
  return useMutation<ThirdParty, AppError, ThirdPartyCreateDTO>({
    mutationFn: createThirdParty,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};

export const useUpdateThirdParty = () => {
  const qc = useQueryClient();
  return useMutation<
    ThirdParty,
    AppError,
    { id: number; body: ThirdPartyUpdateDTO }
  >({
    mutationFn: ({ id, body }) => updateThirdParty(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};

export const useDeleteThirdParty = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: deleteThirdParty,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
