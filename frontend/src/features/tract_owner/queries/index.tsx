import { useQuery } from "@tanstack/react-query";
import { TractOwner, TractOwnerListParams } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { listTractOwners } from "../api";

export const keys = {
  all: ["tractOwner"] as const,
  list: (p?: unknown) => ["tractOwner", "list", p] as const,
  byId: (id: number) => ["tractOwner", "byId", id] as const,
};

export const useTractOwners = (params?: TractOwnerListParams) =>
  useQuery<TractOwner[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listTractOwners(params, { signal }),
  });
