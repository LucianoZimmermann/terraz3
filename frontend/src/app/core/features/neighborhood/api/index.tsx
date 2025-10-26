import { get, post, put, del } from "../../../api/request.ts";
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

export const getNeighborhood = (id: number | string) =>
  get<Neighborhood>(`${BASE_URL}/${id}`);

export const createNeighborhood = (body: NeighborhoodCreateDTO) =>
  post<Neighborhood, NeighborhoodCreateDTO>(BASE_URL, body);

export const updateNeighborhood = (
  id: number | string,
  body: NeighborhoodUpdateDTO,
) => put<Neighborhood, NeighborhoodUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteNeighborhood = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
