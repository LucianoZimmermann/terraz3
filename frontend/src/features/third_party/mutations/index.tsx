import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThirdParty, ThirdPartyCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createThirdParty } from "../api";
import { keys } from "../queries";

export const useCreateThirdParty = () => {
  const qc = useQueryClient();
  return useMutation<ThirdParty, AppError, ThirdPartyCreateDTO>({
    mutationFn: createThirdParty,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
