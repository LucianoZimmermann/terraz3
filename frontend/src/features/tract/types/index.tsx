import { TractOwner } from "../../tract_owner/types/index.tsx";

export type Tract = {
  id: number;
  squareMeters: number;
  tractOwner: TractOwner;
  street?: string;
  number?: string;
  city?: string;
  neighborhood: string;
  state?: string;
  cep?: string;
};

export type TractCreateDTO = {
  squareMeters: number;
  tractOwnerId?: number;
  street?: string;
  number?: string;
  city?: string;
  neighborhood: string;
  state?: string;
  cep?: string;
};

export type TractUpdateDTO = Partial<TractCreateDTO>;

export type TractListParams = {
  tractOwnerId?: number;
  minSquareMeters?: number;
  maxSquareMeters?: number;
  page?: number;
  size?: number;
  sort?: string;
};

export type TractForm = {
  id?: number;
  squareMeters: number | "";
  tractOwnerId: number | "";
  street: string;
  number: string;
  city: string;
  neighborhood: string;
  state: string;
  cep: string;
};
