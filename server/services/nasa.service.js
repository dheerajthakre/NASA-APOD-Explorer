const client = require('../utils/httpClient');
const LRUCache = require('./cache.service');
const { NASA_API_KEY, CACHE_TTL, CACHE_SIZE } = require('../config/env');

const cache = new LRUCache(CACHE_SIZE, CACHE_TTL);
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

function makeCacheKey(params) {
  if (!params || Object.keys(params).length === 0) return 'apod:today';
  const entries = Object.entries(params).filter(([k,v]) => v !== undefined && v !== null).sort();
  return 'apod:' + entries.map(([k, v]) => `${k}=${v}`).join('&');
}

function normalize(data) {
  return {
    date: data.date,
    title: data.title,
    explanation: data.explanation,
    media_type: data.media_type,
    url: data.url,
    hdurl: data.hdurl || null,
    copyright: data.copyright || null,
    raw: data
  };
}

// Fetch single APOD
exports.fetchAPOD = async ({ date } = {}) => {
  const params = {};
  if (date) params.date = date;
  params.api_key = NASA_API_KEY || 'DEMO_KEY';

  const cacheKey = makeCacheKey(params);
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const res = await client.get(NASA_APOD_URL, { params });
  const normalized = normalize(res.data);

  cache.set(cacheKey, normalized);
  return normalized;
};

// Fetch range or last N
exports.fetchAPODRange = async ({ start, end, count } = {}) => {
  const params = { api_key: NASA_API_KEY || 'DEMO_KEY' };

  if (start && end) {
    params.start_date = start;
    params.end_date = end;
    // NASA returns an array for this call
    const res = await client.get(NASA_APOD_URL, { params });
    const arr = Array.isArray(res.data) ? res.data : [];
    const mapped = arr.map(d => normalize(d));
    // cache individually
    mapped.forEach(d => cache.set(makeCacheKey({ date: d.date }), d));
    return mapped;
  }

  if (count && Number.isInteger(count) && count > 0) {
    // fetch last `count` days using single-date calls (so cache benefits)
    const results = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const iso = d.toISOString().slice(0, 10);
      // this uses the cached fetchAPOD
      /* eslint-disable no-await-in-loop */
      const item = await exports.fetchAPOD({ date: iso });
      results.push(item);
    }
    return results;
  }

  // default: last 10 days
  return exports.fetchAPODRange({ count: 10 });
};
