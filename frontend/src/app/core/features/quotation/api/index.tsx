import { get, post, put, del } from "../../../common/api/request.ts";
import {
  Quote,
  QuoteCreateDTO,
  QuoteListParams,
  QuoteUpdateDTO,
} from "../types/index.tsx";

const BASE_URL = "/quotes";

export const listQuotes = (
  params?: QuoteListParams,
  cfg?: { signal?: AbortSignal },
) => get<Quote[]>(BASE_URL, { params, signal: cfg?.signal });

export const getQuote = (id: number | string) =>
  get<Quote>(`${BASE_URL}/${id}`);

export const createQuote = (body: QuoteCreateDTO) =>
  post<Quote, QuoteCreateDTO>(BASE_URL, body);

export const updateQuote = (id: number | string, body: QuoteUpdateDTO) =>
  put<Quote, QuoteUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteQuote = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
