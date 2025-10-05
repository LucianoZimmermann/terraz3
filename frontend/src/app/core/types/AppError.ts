export type AppError = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
  cause?: unknown;
};
