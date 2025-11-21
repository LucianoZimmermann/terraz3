import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { Tract, TractListParams } from "../types";
import { listTracts } from "../api";

export const tractKeys = {
  all: ["tract"] as const,
  lists: () => [...tractKeys.all, "list"] as const,
  list: (params?: TractListParams) =>
    [...tractKeys.lists(), params ?? {}] as const,
  byId: (id: number) => [...tractKeys.all, "byId", id] as const,
};

export const useTracts = (params?: TractListParams) =>
  useQuery<Tract[], AppError>({
    queryKey: tractKeys.list(params),
    queryFn: ({ signal }) => listTracts(params, { signal }),
  });
