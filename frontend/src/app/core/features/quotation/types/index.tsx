import { Factor } from "../../factors/types/index.tsx";
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

export type QuoteFactorInput = {
  thirdPartyId: number;
  materialCost: number;
  laborCost: number;
  factorTypeId: number;
};

export type QuoteCreateDTO = {
  tractId: number;
  factorList: QuoteFactorInput[];
  lotCount?: number;
  pricePerLot?: number;
  feasibility?: FeasibilityEnum;
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
