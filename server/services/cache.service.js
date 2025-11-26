// Simple LRU cache with TTL (in-memory)
class LRUCache {
  constructor(maxSize = 100, ttlSeconds = 3600) {
    this.maxSize = maxSize;
    this.ttl = ttlSeconds * 1000; // ms
    this.map = new Map(); // key -> { value, expiry }
  }

  _isExpired(entry) {
    return Date.now() > entry.expiry;
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (this._isExpired(entry)) {
      this.map.delete(key);
      return null;
    }
    // move to the end (most recently used)
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    const entry = { value, expiry: Date.now() + this.ttl };
    this.map.set(key, entry);

    if (this.map.size > this.maxSize) {
      // evict least-recently-used (first key)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }

  del(key) {
    this.map.delete(key);
  }

  clear() {
    this.map.clear();
  }
}

module.exports = LRUCache;
