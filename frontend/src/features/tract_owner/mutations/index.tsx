import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { createTractOwner } from "../api";
import { TractOwner, TractOwnerCreateDTO } from "../types";
import { keys } from "../queries";

export const useCreateTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<TractOwner, AppError, TractOwnerCreateDTO>({
    mutationFn: createTractOwner,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
