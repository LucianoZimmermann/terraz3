import { FactorType } from "../../factor_type/types/index.tsx";
import { CreatedFactor, Factor } from "../../factors/types/index.tsx";
import { Tract } from "../../tract/types/index.tsx";

export type FeasibilityEnum = string;

export type Quote = {
  id: number;
  tract: Tract;
  factorList: Factor[];
  totalFactorsPrice: number;
  lotCount: number;
  pricePerLot: number;
  feasibility: FeasibilityEnum;
  createDate: string;
};

export type CreatedQuote = {
  id: number;
};

export type CalculatedQuote = {
  tractId: number;
  lotCount: number;
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
  tractId?: number;
  feasibility?: FeasibilityEnum;
  createdAfter?: string;
  createdBefore?: string;
  page?: number;
  size?: number;
  sort?: string;
};
