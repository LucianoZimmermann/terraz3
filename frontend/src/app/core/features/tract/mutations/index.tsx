import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tract, TractCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createTract } from "../api";

export const keys = {
  all: ["tract"] as const,
  list: (p?: unknown) => ["tract", "list", p] as const,
  byId: (id: number | string) => ["tract", "byId", id] as const,
};

export const useCreateTract = () => {
  const qc = useQueryClient();
  return useMutation<Tract, AppError, TractCreateDTO>({
    mutationFn: createTract,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
