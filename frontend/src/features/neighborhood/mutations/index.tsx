import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Neighborhood, NeighborhoodCreateDTO } from "../types";
import { AppError } from "../../../common/api/types/AppError";
import { createNeighborhood } from "../api";
import { keys } from "../queries";

export const useCreateNeighborhood = () => {
  const qc = useQueryClient();
  return useMutation<Neighborhood, AppError, NeighborhoodCreateDTO>({
    mutationFn: createNeighborhood,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });
};
