export default function createPath<T>(pattern: string, fn: T) {
  return Object.assign(fn, { pattern });
}
