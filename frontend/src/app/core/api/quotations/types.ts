import type { Factor } from "../factors/types";
import { Tract } from "../tracts/types.ts";

export type FeasibilityEnum = string;

export type Quote = {
  id: number;
  tract: Tract;
  factorList: Factor[];
  totalFactorsPrice: number;
  lotCount: number | null;
  pricePerLot: number | null;
  feasibility: FeasibilityEnum | null;
  createDate: string;
};

export type QuoteFactorInput = {
  thirdPartyId: number;
  materialCost: number;
  laborCost: number;
  factorTypeId: number;
};

export type QuoteCreateDTO = {
  tractId: number;
  factorList: QuoteFactorInput[];
  lotCount?: number | null;
  pricePerLot?: number | null;
  feasibility?: FeasibilityEnum | null;
};

export type QuoteUpdateDTO = Partial<Omit<QuoteCreateDTO, "tractId">>;

export type QuoteListParams = {
  tractId?: number;
  feasibility?: FeasibilityEnum;
  createdAfter?: string;
  createdBefore?: string;
  page?: number;
  size?: number;
  sort?: string;
};
