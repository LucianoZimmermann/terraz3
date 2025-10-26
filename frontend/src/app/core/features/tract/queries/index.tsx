import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { Tract, TractListParams } from "../types";
import { listTracts } from "../api";
import { keys } from "../mutations";

export const useTracts = (params?: TractListParams) =>
  useQuery<Tract[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listTracts(params, { signal }),
  });
