export type FactorType = {
  id: number;
  factorTypeEnum: string;
};

export type FactorTypeEnum =
  | "HYDRO_SANITARY_SYSTEM"
  | "RAINWATER_DRAINAGE_SYSTEM"
  | "PAVING"
  | "ELECTRICAL_NETWORK"
  | "EARTHWORKS";

export type FactorTypeCreateDTO = {
  factorTypeEnum: string;
};

export type FactorTypeUpdateDTO = Partial<FactorTypeCreateDTO>;

export type FactorTypeListParams = {
  page?: number;
  size?: number;
  sort?: string;
};
