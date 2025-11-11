export type AppError = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
  cause?: unknown;
};

export type AnyObj = Record<string, unknown>;

export type ProblemDetail<
  E extends AnyObj = AnyObj,
  C extends string = string,
> = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: C;
} & E;

type Resp = { status?: number; data?: unknown };

export function getResponse(err: unknown): Resp | null {
  const e = err as any;
  if (e?.cause.response)
    return {
      status: e?.cause?.response?.status,
      data: e?.cause?.response?.data,
    };
  if (typeof e?.status === "number" && "data" in (e ?? {}))
    return { status: e.status, data: e.data };
  return null;
}

export function getStatus(err: unknown): number | undefined {
  return getResponse(err)?.status;
}

export function isStatus(err: unknown, status: number): boolean {
  return getStatus(err) === status;
}

const isObj = (v: unknown): v is AnyObj => !!v && typeof v === "object";

function normalizeProblem(obj: AnyObj): AnyObj {
  const props = obj["properties"];
  if (isObj(props)) {
    const { properties, ...rest } = obj;
    return { ...rest, ...props };
  }
  return obj;
}

export function extractProblem<
  E extends AnyObj = AnyObj,
  C extends string = string,
>(err: unknown): ProblemDetail<E, C> | null {
  const raw = getResponse(err)?.data ?? (err as any)?.data ?? null;
  if (!isObj(raw)) return null;
  const o = normalizeProblem(raw);
  if (
    "title" in o ||
    "status" in o ||
    "code" in o ||
    "type" in o ||
    "detail" in o
  ) {
    return o as ProblemDetail<E, C>;
  }
  return null;
}

export function getProblemCode<C extends string = string>(
  err: unknown,
): C | undefined {
  return extractProblem<AnyObj, C>(err)?.code as C | undefined;
}

export function isProblemCode<C extends string>(
  err: unknown,
  code: C,
): err is ProblemDetail<AnyObj, C> {
  const c = getProblemCode<C>(err);
  return c === code;
}

export function matchProblem<T = void>(
  err: unknown,
  handlers: Record<string, (p: ProblemDetail<any, any>) => T>,
  fallback?: (p: ProblemDetail<any, any> | null) => T,
): T {
  const pd = extractProblem(err);
  if (pd?.code && handlers[pd.code]) return handlers[pd.code](pd);
  if (fallback) return fallback(pd);
  return undefined as unknown as T;
}

export function on409<T = void>(
  err: unknown,
  handler: (p: ProblemDetail | null) => T,
  fallback?: () => T,
): T {
  if (isStatus(err, 409)) {
    return handler(extractProblem(err));
  }
  return (fallback ? fallback() : undefined) as unknown as T;
}
