import { get, post, put, del } from "../../../common/api/request.ts";
import {
  Factor,
  FactorCreateDTO,
  FactorListParams,
  FactorUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/factors";

export const listFactors = (params?: FactorListParams) =>
  get<Factor[]>(BASE_URL, { params });

export const getFactor = (id: number) => get<Factor>(`${BASE_URL}/${id}`);

export const createFactor = (body: FactorCreateDTO) =>
  post<Factor, FactorCreateDTO>(BASE_URL, body);

export const getFactorsByQuotationId = (
  quotationId: number,
  config?: { signal?: AbortSignal },
) => get<Factor[]>(`${BASE_URL}/by-quotation/${quotationId}`, config);

export const updateFactor = (id: number, body: FactorUpdateDTO) =>
  put<Factor, FactorUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteFactor = (id: number) => del<void>(`${BASE_URL}/${id}`);
