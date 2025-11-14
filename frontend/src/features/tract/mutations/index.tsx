import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tract, TractCreateDTO, TractUpdateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createTract, deleteTract, updateTract } from "../api";
import { keys } from "../queries";

export const useCreateTract = () => {
  const qc = useQueryClient();
  return useMutation<Tract, AppError, TractCreateDTO>({
    mutationFn: createTract,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};

export const useUpdateTract = () => {
  const qc = useQueryClient();
  return useMutation<Tract, AppError, { id: number; body: TractUpdateDTO }>({
    mutationFn: ({ id, body }) => updateTract(id, body),
    onSuccess: async (updated) => {
      await Promise.all([
        qc.invalidateQueries({
          queryKey: keys.lists,
          exact: false,
          refetchType: "active",
        }),
        qc.invalidateQueries({
          queryKey: keys.byId(updated.id),
          exact: true,
          refetchType: "active",
        }),
      ]);
    },
  });
};

export const useDeleteTract = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: deleteTract,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
