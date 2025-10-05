import { FactorType } from "../factor_type/types.ts";

export type ThirdParty = {
  id: number;
  name: string;
  cnpj: string;
  factorType: FactorType;
};

export type ThirdPartyCreateDTO = {
  name: string;
  cnpj: string;
  factorTypeId: number;
};

export type ThirdPartyUpdateDTO = Partial<ThirdPartyCreateDTO>;

export type ThirdPartyListParams = {
  q?: string; // opcional: busca por nome/cnpj
  name?: string;
  cnpj?: string;
  factorTypeId?: number;
  page?: number;
  size?: number;
  sort?: string; // ex.: "name,asc"
};
