import { get, post, put, del } from "../../../common/api/request.ts";
import {
  Neighborhood,
  NeighborhoodCreateDTO,
  NeighborhoodListParams,
  NeighborhoodUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/neighborhoods";

export const listNeighborhoods = (
  params?: NeighborhoodListParams,
  cfg?: { signal?: AbortSignal },
) => get<Neighborhood[]>(BASE_URL, { params, signal: cfg?.signal });

export const getNeighborhood = (id: number) =>
  get<Neighborhood>(`${BASE_URL}/${id}`);

export const createNeighborhood = (body: NeighborhoodCreateDTO) =>
  post<Neighborhood, NeighborhoodCreateDTO>(BASE_URL, body);

export const updateNeighborhood = (id: number, body: NeighborhoodUpdateDTO) =>
  put<Neighborhood, NeighborhoodUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteNeighborhood = (id: number) =>
  del<void>(`${BASE_URL}/${id}`);
