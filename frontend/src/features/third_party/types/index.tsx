import { FactorType } from "../../factor_type/types/index.tsx";

export type ThirdParty = {
  id: number;
  name: string;
  contactName?: string;
  cnpj: string;
  phone?: string;
  factorType: FactorType;
};

export type ThirdPartyCreateDTO = {
  name: string;
  contactName?: string;
  cnpj: string;
  phone?: string;
  factorTypeId: number;
};

export type ThirdPartyUpdateDTO = Partial<ThirdPartyCreateDTO>;

export type ThirdPartyListParams = {
  q?: string;
  name?: string;
  contactName?: string;
  cnpj?: string;
  phone?: string;
  factorTypeId?: number;
  page?: number;
  size?: number;
  sort?: string;
};

export type ThirdPartyForm = {
  id?: number;
  name: string;
  contactName?: string;
  phone?: string;
  cnpj: string;
  factorTypeId: number | "";
};
