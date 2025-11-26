import React, { useEffect, useState } from 'react';
import { fetchRange } from '../api/apodApi';
import Loader from '../components/Loader';
import ImageCard from '../components/ImageCard';

export default function Gallery() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const end = new Date();
        const start = new Date(end.getTime() - 9 * 24 * 60 * 60 * 1000); // last 10 days
        const res = await fetchRange(start.toISOString().slice(0,10), end.toISOString().slice(0,10));
        if (!cancelled) setItems(res);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div>
      <h1>Gallery — Recent APODs</h1>
      <div className="grid">
        {items.map(item => <ImageCard key={item.date} item={item} />)}
      </div>
    </div>
  );
}
