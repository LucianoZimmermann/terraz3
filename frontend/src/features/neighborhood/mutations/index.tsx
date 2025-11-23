import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Neighborhood, NeighborhoodCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import {
  createNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
} from "../api";
import { keys } from "../queries";

export const useCreateNeighborhood = () => {
  const qc = useQueryClient();

  return useMutation<Neighborhood, AppError, NeighborhoodCreateDTO>({
    mutationFn: createNeighborhood,
    onSuccess: () => {
      qc.removeQueries({ queryKey: keys.all });
    },
  });
};

export const useUpdateNeighborhood = () => {
  const qc = useQueryClient();

  return useMutation<
    Neighborhood,
    AppError,
    { id: number; body: NeighborhoodCreateDTO }
  >({
    mutationFn: ({ id, body }) => updateNeighborhood(id, body),
    onSuccess: () => {
      qc.removeQueries({ queryKey: keys.all });
    },
  });
};

export const useDeleteNeighborhood = () => {
  const qc = useQueryClient();

  return useMutation<void, AppError, number>({
    mutationFn: deleteNeighborhood,
    onSuccess: () => {
      qc.removeQueries({ queryKey: keys.all });
    },
  });
};
