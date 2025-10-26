import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../core/query/keys";
import {
  listThirdParties,
  createThirdParty,
} from "../../core/api/third_parties";
import type {
  ThirdParty,
  ThirdPartyCreateDTO,
  ThirdPartyListParams,
} from "../../core/api/third_parties/types";
import type { AppError } from "../../core/types/AppError";

export const useThirdParties = (params?: ThirdPartyListParams) =>
  useQuery<ThirdParty[], AppError>({
    queryKey: qk.thirdParty.list(params),
    queryFn: ({ signal }) => listThirdParties(params, { signal }),
  });

export const useCreateThirdParty = () => {
  const qc = useQueryClient();
  return useMutation<ThirdParty, AppError, ThirdPartyCreateDTO>({
    mutationFn: createThirdParty,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.thirdParty.all }),
  });
};
