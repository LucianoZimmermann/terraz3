export type Neighborhood = {
  id: number;
  name: string;
  priceFactor: number;
};

export type NeighborhoodCreateDTO = {
  name: string;
  priceFactor: number;
};

export type NeighborhoodUpdateDTO = Partial<NeighborhoodCreateDTO>;

export type NeighborhoodListParams = {
  page?: number;
  size?: number;
  sort?: string;
};
