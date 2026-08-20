export function toNative(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === "bigint") return Number(value);
  if (Array.isArray(value)) return value.map(toNative);
  if (typeof value === "object") {
    if (typeof value.toNumber === "function") return value.toNumber();
    if (typeof value.toString === "function" && value.constructor?.name?.startsWith("Date")) return value.toISOString();
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = toNative(item);
    return out;
  }
  return value;
}

export function recordToObject(record) {
  return toNative(record.toObject());
}
