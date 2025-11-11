import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { Neighborhood, NeighborhoodListParams } from "../types";
import { listNeighborhoods } from "../api";

export const keys = {
  all: ["neighborhood"] as const,
  list: (p?: unknown) => ["neighborhood", "list", p] as const,
  byId: (id: number) => ["neighborhood", "byId", id] as const,
};

export const useNeighborhoods = (params?: NeighborhoodListParams) =>
  useQuery<Neighborhood[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listNeighborhoods(params, { signal }),
  });
