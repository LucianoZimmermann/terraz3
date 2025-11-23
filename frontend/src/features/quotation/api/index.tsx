import { get, post, put, del } from "../../../common/api/request.ts";
import {
  Quote,
  CreateQuoteDTO,
  QuoteListParams,
  UpdateQuoteDTO,
  CalculatedQuote,
} from "../types/index.tsx";

const BASE_URL = "/quotes";

export const listQuotes = (
  params?: QuoteListParams,
  cfg?: { signal?: AbortSignal },
) => get<Quote[]>(BASE_URL, { params, signal: cfg?.signal });

export const getQuote = (id: number) => get<Quote>(`${BASE_URL}/${id}`);

export const createQuote = (body: CreateQuoteDTO) =>
  post<Quote, CreateQuoteDTO>(BASE_URL, body);

export const updateQuote = (id: number, body: CalculatedQuote) =>
  put<Quote, UpdateQuoteDTO>(`${BASE_URL}/${id}`, body);

export const deleteQuote = (id: number) => del<void>(`${BASE_URL}/${id}`);
