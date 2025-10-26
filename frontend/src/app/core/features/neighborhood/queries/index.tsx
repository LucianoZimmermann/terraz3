import { useQuery } from "@tanstack/react-query";
import { qk } from "../../../query/keys";
import { AppError } from "../../../types/AppError";
import { Neighborhood, NeighborhoodListParams } from "../types";
import { listNeighborhoods } from "../api";

export const useNeighborhoods = (params?: NeighborhoodListParams) =>
  useQuery<Neighborhood[], AppError>({
    queryKey: qk.neighborhood.list(params),
    queryFn: ({ signal }) => listNeighborhoods(params, { signal }),
  });
