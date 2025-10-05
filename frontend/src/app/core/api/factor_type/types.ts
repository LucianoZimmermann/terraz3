export type FactorTypeEnum = string;

export type FactorType = {
  id: number;
  factorTypeEnum: FactorTypeEnum;
};

export type FactorTypeCreateDTO = {
  factorTypeEnum: FactorTypeEnum;
};

export type FactorTypeUpdateDTO = Partial<FactorTypeCreateDTO>;

export type FactorTypeListParams = {
  page?: number;
  size?: number;
  sort?: string;
};
