import { useQuery } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import { Quote, QuoteListParams } from "../types";
import { listQuotes } from "../api";

export const keys = {
  all: ["quote"] as const,
  list: (p?: unknown) => ["quote", "list", p] as const,
  byId: (id: number) => ["quote", "byId", id] as const,
};

export const useQuotes = (params?: QuoteListParams) =>
  useQuery<Quote[], AppError>({
    queryKey: keys.list(params),
    queryFn: ({ signal }) => listQuotes(params, { signal }),
  });
