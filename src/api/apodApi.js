const API_ROOT = import.meta.env.VITE_API_ROOT || '/api/apod';

export async function fetchToday() {
  const res = await fetch(`${API_ROOT}/today`);
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || 'Failed to fetch today APOD');
  }
  return res.json();
}

export async function fetchByDate(date) {
  const res = await fetch(`${API_ROOT}/${date}`);
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || `Failed to fetch APOD for ${date}`);
  }
  return res.json();
}

export async function fetchRange(start, end) {
  const q = new URLSearchParams();
  if (start) q.set('start', start);
  if (end) q.set('end', end);
  const res = await fetch(`${API_ROOT}?${q.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || 'Failed to fetch APOD range');
  }
  return res.json();
}

export async function fetchRecent(count = 10) {
  const res = await fetch(`${API_ROOT}?count=${count}`);
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || 'Failed to fetch recent APODs');
  }
  return res.json();
}
