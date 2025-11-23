import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tract, TractCreateDTO, TractUpdateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createTract, deleteTract, updateTract } from "../api";
import { tractKeys } from "../queries";

export const useCreateTract = () => {
  const qc = useQueryClient();

  return useMutation<Tract, AppError, TractCreateDTO>({
    mutationFn: createTract,
    onSuccess: () => {
      qc.removeQueries({ queryKey: tractKeys.all });
    },
  });
};

export const useUpdateTract = () => {
  const qc = useQueryClient();

  return useMutation<Tract, AppError, { id: number; body: TractUpdateDTO }>({
    mutationFn: ({ id, body }) => updateTract(id, body),
    onSuccess: () => {
      qc.removeQueries({ queryKey: tractKeys.all });
    },
  });
};

export const useDeleteTract = () => {
  const qc = useQueryClient();

  return useMutation<void, AppError, number>({
    mutationFn: deleteTract,
    onSuccess: () => {
      qc.removeQueries({ queryKey: tractKeys.all });
    },
  });
};
