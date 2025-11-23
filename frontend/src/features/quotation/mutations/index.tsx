import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "../queries";
import { CalculatedQuote, CreatedQuote, CreateQuoteDTO, Quote } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createQuote, deleteQuote, updateQuote } from "../api";

export const useCreateQuote = () => {
  const qc = useQueryClient();
  return useMutation<CreatedQuote, AppError, CreateQuoteDTO>({
    mutationFn: createQuote,
    onSuccess: () => qc.removeQueries({ queryKey: keys.all }),
  });
};

export const useUpdateQuote = () => {
  const qc = useQueryClient();
  return useMutation<Quote, AppError, { id: number; body: CalculatedQuote }>({
    mutationFn: ({ id, body }) => updateQuote(id, body),
    onSuccess: () => qc.removeQueries({ queryKey: keys.all }),
  });
};

export const useDeleteQuote = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: deleteQuote,
    onSuccess: () => qc.removeQueries({ queryKey: keys.all }),
  });
};
