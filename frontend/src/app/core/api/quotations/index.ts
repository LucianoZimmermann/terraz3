import type {
  Quote,
  QuoteCreateDTO,
  QuoteUpdateDTO,
  QuoteListParams,
} from "./types";
import { get, put, del, post } from "../request.ts";

const BASE_URL = "/quotes";

export const listQuotes = (params?: QuoteListParams) =>
  get<Quote[]>(BASE_URL, { params });

export const getQuote = (id: number | string) =>
  get<Quote>(`${BASE_URL}/${id}`);

export const createQuote = (body: QuoteCreateDTO) =>
  post<Quote, QuoteCreateDTO>(BASE_URL, body);

export const updateQuote = (id: number | string, body: QuoteUpdateDTO) =>
  put<Quote, QuoteUpdateDTO>(`${BASE_URL}/${id}`, body);

export const deleteQuote = (id: number | string) =>
  del<void>(`${BASE_URL}/${id}`);
