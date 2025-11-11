import { get, post, put, del } from "../../../common/api/request.ts";
import {
  ThirdParty,
  ThirdPartyCreateDTO,
  ThirdPartyListParams,
  ThirdPartyUpdateDTO,
} from "../types/index.tsx";
const BASE_URL = "/third-parties";

export const listThirdParties = (
  params?: ThirdPartyListParams,
  cfg?: { signal?: AbortSignal },
) => get<ThirdParty[]>(BASE_URL, { params, signal: cfg?.signal });

export const getThirdParty = (id: number) =>
  get<ThirdParty>(`${BASE_URL}/${id}`);

export const createThirdParty = (body: ThirdPartyCreateDTO) =>
  post<ThirdParty, ThirdPartyCreateDTO>(BASE_URL, body);

export const updateThirdParty = (id: number, body: ThirdPartyUpdateDTO) =>
  put<ThirdParty, ThirdPartyUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteThirdParty = (id: number) => del<void>(`${BASE_URL}/${id}`);
