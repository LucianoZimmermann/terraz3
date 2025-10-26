import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppError } from "../../../types/AppError";
import { createTractOwner } from "../api";
import { TractOwner, TractOwnerCreateDTO } from "../types";
import { qk } from "../../../query/keys";

export const useCreateTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<TractOwner, AppError, TractOwnerCreateDTO>({
    mutationFn: createTractOwner,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.tractOwner.all }),
  });
};
