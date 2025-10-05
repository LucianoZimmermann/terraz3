import { TractOwner } from "../tract_owner/types.ts";
import { Address } from "../address/types.ts";

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
