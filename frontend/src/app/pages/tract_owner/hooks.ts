import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../core/query/keys";

import type { AppError } from "../../core/types/AppError";
import {
  TractOwner,
  TractOwnerCreateDTO,
  TractOwnerListParams,
} from "../../core/api/tract_owner/types.ts";
import { createTractOwner, listTractOwners } from "../../core/api/tract_owner";

export const useTractOwners = (params?: TractOwnerListParams) =>
  useQuery<TractOwner[], AppError>({
    queryKey: qk.tractOwner.list(params),
    queryFn: ({ signal }) => listTractOwners(params, { signal }),
  });

export const useCreateTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<TractOwner, AppError, TractOwnerCreateDTO>({
    mutationFn: createTractOwner,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.tractOwner.all }),
  });
};
