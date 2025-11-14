import { Address } from "../../address/types/index.tsx";
import { Neighborhood } from "../../neighborhood/types/index.tsx";
import { TractOwner } from "../../tract_owner/types/index.tsx";

export type Tract = {
  id: number;
  squareMeters: number;
  address: Address;
  tractOwner: TractOwner;
};

export type TractCreateDTO = {
  squareMeters: number;
  addressId?: number;
  tractOwnerId?: number;
};

export type TractUpdateDTO = Partial<TractCreateDTO>;

export type TractListParams = {
  addressId?: number;
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
  street: string;
  city: string;
  neighborhoodId: number | "";
  cep: string;
  tractOwnerId: number | "";
};
