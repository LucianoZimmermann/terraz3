export const qk = {
  neighborhood: {
    all: ["neighborhood"] as const,
    list: (p?: unknown) => ["neighborhood", "list", p] as const,
    byId: (id: number | string) => ["neighborhood", "byId", id] as const,
  },
  address: {
    all: ["address"] as const,
    list: (p?: unknown) => ["address", "list", p] as const,
    byId: (id: number | string) => ["address", "byId", id] as const,
  },
  tractOwner: {
    all: ["tractOwner"] as const,
    list: (p?: unknown) => ["tractOwner", "list", p] as const,
    byId: (id: number | string) => ["tractOwner", "byId", id] as const,
  },
  factorType: {
    all: ["factorType"] as const,
    list: (p?: unknown) => ["factorType", "list", p] as const,
    byId: (id: number | string) => ["factorType", "byId", id] as const,
  },
  thirdParty: {
    all: ["thirdParty"] as const,
    list: (p?: unknown) => ["thirdParty", "list", p] as const,
    byId: (id: number | string) => ["thirdParty", "byId", id] as const,
  },
  factor: {
    all: ["factor"] as const,
    list: (p?: unknown) => ["factor", "list", p] as const,
    byId: (id: number | string) => ["factor", "byId", id] as const,
  },
  tract: {
    all: ["tract"] as const,
    list: (p?: unknown) => ["tract", "list", p] as const,
    byId: (id: number | string) => ["tract", "byId", id] as const,
  },
  quote: {
    all: ["quote"] as const,
    list: (p?: unknown) => ["quote", "list", p] as const,
    byId: (id: number | string) => ["quote", "byId", id] as const,
  },
} as const;
