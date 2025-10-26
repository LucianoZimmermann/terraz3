import { get, post, put, del } from "../../../api/request.ts";
import {
  Tract,
  TractCreateDTO,
  TractListParams,
  TractUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/tracts";

export const listTracts = (params?: TractListParams) =>
  get<Tract[]>(BASE_URL, { params });

export const getTract = (id: number | string) =>
  get<Tract>(`${BASE_URL}/${id}`);

export const createTract = (body: TractCreateDTO) =>
  post<Tract, TractCreateDTO>(BASE_URL, body);

export const updateTract = (id: number | string, body: TractUpdateDTO) =>
  put<Tract, TractUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteTract = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
