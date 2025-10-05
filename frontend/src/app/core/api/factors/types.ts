import { FactorType } from "../factor_type/types.ts";
import { ThirdParty } from "../third_parties/types.ts";
import { Quote } from "../quotations/types.ts";

export type Factor = {
  id: number;
  quote: Quote;
  thirdParty: ThirdParty;
  materialCost: number;
  laborCost: number;
  factorType: FactorType;
};

export type FactorCreateDTO = {
  quoteId: number;
  thirdPartyId: number;
  materialCost: number;
  laborCost: number;
  factorTypeId: number;
};

export type FactorUpdateDTO = Partial<FactorCreateDTO>;

export type FactorListParams = {
  quoteId?: number;
  thirdPartyId?: number;
  factorTypeId?: number;
  page?: number;
  size?: number;
  sort?: string;
};
