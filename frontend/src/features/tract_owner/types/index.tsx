export type TractOwner = {
  id: number;
  name: string;
  cpf: string;
  phone?: string;
};

export type TractOwnerCreateDTO = {
  name: string;
  cpf: string;
  phone?: string;
};

export type TractOwnerUpdateDTO = Partial<TractOwnerCreateDTO>;

export type TractOwnerListParams = {
  q?: string;
  name?: string;
  cpf?: string;
  phone?: string;
  page?: number;
  size?: number;
  sort?: string;
};
