import { useQuery } from "@tanstack/react-query";
import { TractOwner, TractOwnerListParams } from "../types";
import { AppError } from "../../../types/AppError";
import { listTractOwners } from "../api";
import { qk } from "../../../query/keys";

export const useTractOwners = (params?: TractOwnerListParams) =>
  useQuery<TractOwner[], AppError>({
    queryKey: qk.tractOwner.list(params),
    queryFn: ({ signal }) => listTractOwners(params, { signal }),
  });
