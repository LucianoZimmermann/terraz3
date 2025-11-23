import { create } from "zustand";

type CreatedQuoteStore = {
  createdQuoteId: number | null;
  setCreatedQuoteId: (id: number) => void;
  clearCreatedQuoteId: () => void;
};

export const useCreatedQuote = create<CreatedQuoteStore>((set) => ({
  createdQuoteId: null,
  setCreatedQuoteId: (id: number) => set({ createdQuoteId: id }),
  clearCreatedQuoteId: () => set({ createdQuoteId: null }),
}));
