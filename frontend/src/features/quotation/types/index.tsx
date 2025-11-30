import { CreatedFactor, Factor } from "../../factors/types/index.tsx";
import { Tract } from "../../tract/types/index.tsx";

export type Quote = {
  id: number;
  tract: Tract;
  factorList: Factor[];
  totalFactorsPrice: number;
  lotCount: number;
  pricePerLot: number;
  createDate: string;
};

export type CreatedQuote = {
  id: number;
};

export type CalculatedQuote = {
  tractId: number;
  pricePerLot: number;
  lotCount: number;
  tractOwnerLotCount: number;
  factors: CreatedFactor[];
  totalFactorsPrice: number;
};

export type QuoteFactorInput = {
  thirdPartyId: number;
  materialCost: number;
  laborCost: number;
  factorTypeId: number;
};

export type CreateQuoteDTO = {
  factorList: QuoteFactorInput[];
  lotCount?: number;
  pricePerLot?: number;
};

export type UpdateQuoteDTO = Partial<Omit<Quote, "tractId">>;

export type QuoteListParams = {
  numericQuoteId?: number;
  tractId?: number;
  createdAfter?: string;
  createdBefore?: string;
  page?: number;
  size?: number;
  sort?: string;
};
