import { get, post, put, del } from "../../../api/request.ts";
import {
  Factor,
  FactorCreateDTO,
  FactorListParams,
  FactorUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/factors";

export const listFactors = (params?: FactorListParams) =>
  get<Factor[]>(BASE_URL, { params });

export const getFactor = (id: number | string) =>
  get<Factor>(`${BASE_URL}/${id}`);

export const createFactor = (body: FactorCreateDTO) =>
  post<Factor, FactorCreateDTO>(BASE_URL, body);

export const updateFactor = (id: number | string, body: FactorUpdateDTO) =>
  put<Factor, FactorUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteFactor = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
