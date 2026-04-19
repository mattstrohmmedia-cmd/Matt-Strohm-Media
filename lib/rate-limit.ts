// Simple in-memory sliding-window rate limiter.
// Replace with Vercel KV / Upstash Redis in prod for multi-instance correctness.

type Bucket = { hits: number[]; };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, max = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  if (bucket.hits.length >= max) {
    buckets.set(key, bucket);
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - bucket.hits[0])) / 1000) };
  }
  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { ok: true as const, remaining: max - bucket.hits.length };
}

export function clientIp(headers: Headers) {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
