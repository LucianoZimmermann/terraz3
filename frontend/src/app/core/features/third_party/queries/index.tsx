import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { ThirdParty, ThirdPartyListParams } from "../types";
import { listThirdParties } from "../api";

export const keys = {
  all: ["thirdParty"] as const,
  list: (p?: unknown) => ["thirdParty", "list", p] as const,
  byId: (id: number | string) => ["thirdParty", "byId", id] as const,
};

export const useThirdParties = (params?: ThirdPartyListParams) =>
  useQuery<ThirdParty[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listThirdParties(params, { signal }),
  });
