import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../core/query/keys.ts";
import {
  createNeighborhood,
  listNeighborhoods,
} from "../../core/api/neighborhoods";
import {
  Neighborhood,
  NeighborhoodCreateDTO,
  NeighborhoodListParams,
} from "../../core/api/neighborhoods/types.ts";
import { AppError } from "../../core/types/AppError.ts";

export const useNeighborhoods = (params?: NeighborhoodListParams) =>
  useQuery<Neighborhood[], AppError>({
    queryKey: qk.neighborhood.list(params),
    queryFn: ({ signal }) => listNeighborhoods(params, { signal }),
  });

export const useCreateNeighborhood = () => {
  const qc = useQueryClient();
  return useMutation<Neighborhood, AppError, NeighborhoodCreateDTO>({
    mutationFn: createNeighborhood,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.neighborhood.all }),
  });
};
