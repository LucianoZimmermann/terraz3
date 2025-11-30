import { FactorType, FactorTypeEnum } from "../../factor_type/types/index.tsx";
import { Quote } from "../../quotation/types";
import { ThirdParty } from "../../third_party/types/index.tsx";

export type Factor = {
  id: number;
  quote: Quote;
  thirdParty: ThirdParty;
  price: number;
  factorType: FactorType;
};

export type CreatedFactor = {
  factorTypeId: number;
  type: FactorTypeEnum;
  price: number | null;
  thirdPartyId: number | null;
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
