// A "naïve" in‑memory cache that never evicts
const cache = new Map();

export function leak(key, value) {
    cache.set(key, value);
    // Return size so we can log growth
    return cache.size;
}
