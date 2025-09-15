export const isBlank = (v: unknown) =>
  v == null ||
  (typeof v === 'object' &&
    Object.values(v as Record<string, unknown>).every(
      (x) => x == null || (typeof x === 'string' && x.trim().length === 0),
    ))
