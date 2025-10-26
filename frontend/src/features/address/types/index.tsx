import { Neighborhood } from "../../neighborhood/types";

export type Address = {
  id: number;
  street: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  neighborhood: Neighborhood;
};

export type AddressCreateDTO = {
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  cep?: string;
  neighborhoodId: number;
};

export type AddressUpdateDTO = Partial<AddressCreateDTO>;

export type AddressListParams = {
  city?: string;
  state?: string;
  neighborhoodId?: number;
  page?: number;
  size?: number;
  sort?: string;
};
