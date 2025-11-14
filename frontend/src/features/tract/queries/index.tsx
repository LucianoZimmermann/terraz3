import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { Tract, TractListParams } from "../types";
import { listTracts } from "../api";

export const keys = {
  all: ["tract"] as const,
  lists: ["tract", "list"] as const,
  list: (p?: unknown) => ["tract", "list", p] as const,
  byId: (id: number) => ["tract", "byId", id] as const,
};

export const useTracts = (params?: TractListParams) =>
  useQuery<Tract[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listTracts(params, { signal }),
  });
