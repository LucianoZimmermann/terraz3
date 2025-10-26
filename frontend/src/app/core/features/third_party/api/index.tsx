import { get, post, put, del } from "../../../api/request.ts";
import {
  ThirdParty,
  ThirdPartyCreateDTO,
  ThirdPartyListParams,
  ThirdPartyUpdateDTO,
} from "../types/index.tsx";
const BASE_URL = "/third-parties";

export const listThirdParties = (params?: ThirdPartyListParams) =>
  get<ThirdParty[]>(BASE_URL, { params });

export const getThirdParty = (id: number | string) =>
  get<ThirdParty>(`${BASE_URL}/${id}`);

export const createThirdParty = (body: ThirdPartyCreateDTO) =>
  post<ThirdParty, ThirdPartyCreateDTO>(BASE_URL, body);

export const updateThirdParty = (
  id: number | string,
  body: ThirdPartyUpdateDTO,
) => put<ThirdParty, ThirdPartyUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteThirdParty = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
