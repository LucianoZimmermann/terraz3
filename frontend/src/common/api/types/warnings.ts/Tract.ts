import type { ProblemDetail } from "../../types/AppError";

export type TractAddressItem = { tractId: number; street: string; cep: string };

export type OwnerDeletionConflictPD = ProblemDetail<
  {
    conflict: {
      ownerId: number;
      tractsCount: number;
      tracts: TractAddressItem[];
    };
  },
  "OWNER_HAS_DEPENDENTS"
>;

export function isOwnerDeletionConflict(
  pd: unknown,
): pd is OwnerDeletionConflictPD {
  const x = pd as any;
  return (
    x?.code === "OWNER_HAS_DEPENDENTS" &&
    x?.conflict != null &&
    typeof x.conflict?.ownerId === "number" &&
    typeof x.conflict?.tractsCount === "number" &&
    Array.isArray(x.conflict?.tracts)
  );
}
