export default function createPath<T>(
  pattern: string,
  fn: T,
  meta = { unprotected: false },
) {
  return Object.assign(fn, { pattern, meta });
}
