import {
  Address,
  AddressCreateDTO,
  AddressListParams,
  AddressUpdateDTO,
} from "../types/index.tsx";
import { get, post, put, del } from "../../../common/api/request.ts";

const BASE_URL = "/addresses";

export const listAddresses = (
  params?: AddressListParams,
  cfg?: { signal?: AbortSignal },
) => get<Address[]>(BASE_URL, { params, signal: cfg?.signal });

export const getAddress = (id: number) => get<Address>(`${BASE_URL}/${id}`);

export const createAddress = (body: AddressCreateDTO) =>
  post<Address, AddressCreateDTO>(BASE_URL, body);

export const updateAddress = (id: number, body: AddressUpdateDTO) =>
  put<Address, AddressUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteAddress = (id: number) => del<void>(`${BASE_URL}/${id}`);
