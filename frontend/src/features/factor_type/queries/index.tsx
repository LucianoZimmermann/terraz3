import { useQuery } from "@tanstack/react-query";
import { FactorType, FactorTypeListParams } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { listFactorTypes } from "../api";

export const keys = {
  all: ["factorType"] as const,
  list: (p?: unknown) => ["factorType", "list", p] as const,
  byId: (id: number) => ["factorType", "byId", id] as const,
};

export const useFactorTypes = (params?: FactorTypeListParams) =>
  useQuery<FactorType[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listFactorTypes(params, { signal }),
  });
