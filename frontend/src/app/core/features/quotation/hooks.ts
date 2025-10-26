import {
  Quote,
  QuoteCreateDTO,
  QuoteListParams,
} from "../../core/api/quotations/types.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppError } from "../../core/types/AppError.ts";
import { qk } from "../../core/query/keys.ts";
import { createQuote, listQuotes } from "../../core/api/quotations";

export const useQuotes = (params?: QuoteListParams) =>
  useQuery<Quote[], AppError>({
    queryKey: qk.quote.list(params),
    queryFn: ({ signal }) => listQuotes(params, { signal }),
  });

export const useCreateQuote = () => {
  const qc = useQueryClient();
  useMutation<Quote, AppError, QuoteCreateDTO>({
    mutationFn: createQuote,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.quote.all }),
  });
};
