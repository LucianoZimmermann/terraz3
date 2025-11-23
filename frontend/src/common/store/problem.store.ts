import { create } from "zustand";
import type { ProblemDetail } from "../api/types/AppError";
import type { OwnerDeletionConflictPD } from "../api/types/warnings.ts/Tract";

type AnyProblem = ProblemDetail<any, string>;

type ProblemStore = {
  problem: AnyProblem | null;
  setProblem: (p: AnyProblem) => void;
  clear: () => void;
};

export const useProblemStore = create<ProblemStore>()((set, get) => ({
  problem: null,
  setProblem: (p) => {
    if (get().problem === p) return;
    set({ problem: p });
  },
  clear: () => set({ problem: null }),
}));

export const useOwnerDeletionConflict = (): OwnerDeletionConflictPD | null =>
  useProblemStore((s) =>
    s.problem?.code === "OWNER_HAS_DEPENDENTS"
      ? (s.problem as OwnerDeletionConflictPD)
      : null,
  );

export const useOwnerDeletionOpen = (): boolean =>
  useProblemStore((s) => s.problem?.code === "OWNER_HAS_DEPENDENTS") ?? false;
