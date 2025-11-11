import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tract, TractCreateDTO, TractUpdateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createTract, deleteTract, updateTract } from "../api";

export const keys = {
  all: ["tract"] as const,
  list: (p?: unknown) => ["tract", "list", p] as const,
  byId: (id: number) => ["tract", "byId", id] as const,
};

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
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};

export const useDeleteTract = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: deleteTract,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
