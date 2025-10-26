// src/app/pages/tracts/hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../common/query/keys";
import { listTracts, createTract } from "../../common/api/tracts";
import type {
  Tract,
  TractCreateDTO,
  TractListParams,
} from "../../common/api/tracts/types";
import type { AppError } from "../../common/api/types/AppError";

export const useTracts = (params?: TractListParams) =>
  useQuery<Tract[], AppError>({
    queryKey: qk.tract.list(params),
    queryFn: ({ signal }) => listTracts(params, { signal }),
  });

export const useCreateTract = () => {
  const qc = useQueryClient();
  return useMutation<Tract, AppError, TractCreateDTO>({
    mutationFn: createTract,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.tract.all }),
  });
};
