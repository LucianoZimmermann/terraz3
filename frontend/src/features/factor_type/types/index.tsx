export type FactorType = {
  id: number;
  factorTypeEnum: string;
};

export type FactorTypeCreateDTO = {
  factorTypeEnum: string;
};

export type FactorTypeUpdateDTO = Partial<FactorTypeCreateDTO>;

export type FactorTypeListParams = {
  page?: number;
  size?: number;
  sort?: string;
};
