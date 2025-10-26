import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Neighborhood, NeighborhoodCreateDTO } from "../types";
import { AppError } from "../../../types/AppError";
import { qk } from "../../../query/keys";
import { createNeighborhood } from "../api";

export const useCreateNeighborhood = () => {
  const qc = useQueryClient();
  return useMutation<Neighborhood, AppError, NeighborhoodCreateDTO>({
    mutationFn: createNeighborhood,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.neighborhood.all }),
  });
};
