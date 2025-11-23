import { get, post, put, del } from "../../../common/api/request.ts";
import {
  Tract,
  TractCreateDTO,
  TractListParams,
  TractUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/tracts";

export const listTracts = (
  params?: TractListParams,
  cfg?: { signal?: AbortSignal },
) => get<Tract[]>(BASE_URL, { params, signal: cfg?.signal });

export const getTract = (id: number) => get<Tract>(`${BASE_URL}/${id}`);

export const createTract = (body: TractCreateDTO) =>
  post<Tract, TractCreateDTO>(BASE_URL, body);

export const updateTract = (id: number, body: TractUpdateDTO) =>
  put<Tract, TractUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteTract = (id: number) => del<void>(`${BASE_URL}/${id}`);
