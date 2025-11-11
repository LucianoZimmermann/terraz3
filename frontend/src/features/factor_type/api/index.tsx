import { put, del, get, post } from "../../../common/api/request";
import {
  FactorType,
  FactorTypeCreateDTO,
  FactorTypeListParams,
  FactorTypeUpdateDTO,
} from "../types";

const BASE_URL = "/factor-types";

export const listFactorTypes = (params?: FactorTypeListParams) =>
  get<FactorType[]>(BASE_URL, { params });

export const getFactorType = (id: number) =>
  get<FactorType>(`${BASE_URL}/${id}`);

export const createFactorType = (body: FactorTypeCreateDTO) =>
  post<FactorType, FactorTypeCreateDTO>(BASE_URL, body);

export const updateFactorType = (id: number, body: FactorTypeUpdateDTO) =>
  put<FactorType, FactorTypeUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteFactorType = (id: number) => del<void>(`${BASE_URL}/${id}`);
