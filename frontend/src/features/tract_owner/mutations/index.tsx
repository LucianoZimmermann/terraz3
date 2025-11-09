import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppError } from "../../../common/api/types/AppError";
import {
  createTractOwner,
  updateTractOwner,
  deleteTractOwner,
  deleteTractOwnerCascade,
} from "../api";
import { TractOwner, TractOwnerCreateDTO, TractOwnerUpdateDTO } from "../types";
import { keys } from "../queries";

export const useCreateTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<TractOwner, AppError, TractOwnerCreateDTO>({
    mutationFn: createTractOwner,
    onSuccess: (created) => {
      qc.setQueriesData<TractOwner[] | undefined>(
        { queryKey: keys.all, exact: false },
        (prev) => (Array.isArray(prev) ? [created, ...prev] : prev),
      );
      qc.setQueryData(keys.byId(created.id), created);
    },
  });
};

export const useUpdateTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<
    TractOwner,
    AppError,
    { id: number; body: TractOwnerUpdateDTO }
  >({
    mutationFn: ({ id, body }) => updateTractOwner(id, body),
    onSuccess: (updated) => {
      qc.setQueriesData<TractOwner[] | undefined>(
        { queryKey: keys.all, exact: false },
        (prev) =>
          Array.isArray(prev)
            ? prev.map((t) => (t.id === updated.id ? updated : t))
            : prev,
      );
      qc.setQueryData(keys.byId(updated.id), updated);
    },
  });
};

export const useDeleteTractOwner = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: (id) => deleteTractOwner(id),
    onSuccess: (_, id) => {
      qc.setQueriesData<TractOwner[] | undefined>(
        { queryKey: keys.all, exact: false },
        (prev) =>
          Array.isArray(prev) ? prev.filter((t) => t.id !== id) : prev,
      );
      qc.removeQueries({ queryKey: keys.byId(id), exact: true });
    },
  });
};

export const useDeleteTractOwnerCascade = () => {
  const qc = useQueryClient();
  return useMutation<void, AppError, number>({
    mutationFn: (id) => deleteTractOwnerCascade(id),
    onSuccess: (_, id) => {
      qc.setQueriesData<TractOwner[] | undefined>(
        { queryKey: keys.all, exact: false },
        (prev) =>
          Array.isArray(prev) ? prev.filter((t) => t.id !== id) : prev,
      );
      qc.removeQueries({ queryKey: keys.byId(id), exact: true });
    },
  });
};
