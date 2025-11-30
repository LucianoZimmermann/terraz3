export type FactorType = {
  id: number;
  factorTypeEnum: string;
};

export type FactorTypeEnumString =
  | "HYDRO_SANITARY_SYSTEM"
  | "RAINWATER_DRAINAGE_SYSTEM"
  | "PAVING"
  | "ELECTRICAL_NETWORK"
  | "EARTHWORKS";

export enum FactorTypeEnum {
  HYDRO_SANITARY_SYSTEM = "HYDRO_SANITARY_SYSTEM",
  RAINWATER_DRAINAGE_SYSTEM = "RAINWATER_DRAINAGE_SYSTEM",
  PAVING = "PAVING",
  EARTHWORKS = "EARTHWORKS",
  ELECTRICAL_NETWORK = "ELECTRICAL_NETWORK",
}

export type FactorTypeCreateDTO = {
  factorTypeEnum: string;
};

export type FactorTypeUpdateDTO = Partial<FactorTypeCreateDTO>;

export type FactorTypeListParams = {
  page?: number;
  size?: number;
  sort?: string;
};
