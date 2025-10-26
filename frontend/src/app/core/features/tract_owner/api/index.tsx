import { get, post, put, del } from "../../../common/api/request.ts";
import {
  TractOwner,
  TractOwnerCreateDTO,
  TractOwnerListParams,
  TractOwnerUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/tract-owners";

export const listTractOwners = (
  params?: TractOwnerListParams,
  cfg?: { signal?: AbortSignal },
) => get<TractOwner[]>(BASE_URL, { params, signal: cfg?.signal });

export const getTractOwner = (id: number | string) =>
  get<TractOwner>(`${BASE_URL}/${id}`);

export const createTractOwner = (body: TractOwnerCreateDTO) =>
  post<TractOwner, TractOwnerCreateDTO>(BASE_URL, body);

export const updateTractOwner = (
  id: number | string,
  body: TractOwnerUpdateDTO,
) => put<TractOwner, TractOwnerUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteTractOwner = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
