import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "../queries";
import { Quote, QuoteCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createQuote } from "../api";

export const useCreateQuote = () => {
  const qc = useQueryClient();
  useMutation<Quote, AppError, QuoteCreateDTO>({
    mutationFn: createQuote,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
