import { get, post, put, del } from "../request.ts";
import type {
  FactorType,
  FactorTypeCreateDTO,
  FactorTypeUpdateDTO,
  FactorTypeListParams,
} from "./types.ts";

const BASE_URL = "/factor-types";

export const listFactorTypes = (params?: FactorTypeListParams) =>
  get<FactorType[]>(BASE_URL, { params });

export const getFactorType = (id: number | string) =>
  get<FactorType>(`${BASE_URL}/${id}`);

export const createFactorType = (body: FactorTypeCreateDTO) =>
  post<FactorType, FactorTypeCreateDTO>(BASE_URL, body);

export const updateFactorType = (
  id: number | string,
  body: FactorTypeUpdateDTO,
) => put<FactorType, FactorTypeUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteFactorType = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
