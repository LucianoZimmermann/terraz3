import { useQuery } from "@tanstack/react-query";
import { Factor } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { getFactorsByQuotationId } from "../api";

export const keys = {
  all: ["factors"] as const,
  list: (p?: unknown) => ["factor", "list", p] as const,
  byId: (id: number) => ["factor", "byId", id] as const,
  byQuotationId: (quotationId: number) =>
    ["factor", "byQuotationId", quotationId] as const,
};

export const useFactorsByQuotationId = (quotationId?: number) =>
  useQuery<Factor[], AppError>({
    queryKey: quotationId
      ? keys.byQuotationId(quotationId)
      : ["factor", "byQuotationId", "unknown"],
    enabled: typeof quotationId === "number",
    queryFn: ({ signal }) => getFactorsByQuotationId(quotationId!, { signal }),
  });
