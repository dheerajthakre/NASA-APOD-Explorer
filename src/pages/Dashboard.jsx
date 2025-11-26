import React, { useState } from 'react';
import { fetchToday, fetchByDate } from '../api/apodApi';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => fetchToday(), []);
  const [date, setDate] = useState('');
  const [picked, setPicked] = useState(null);
  const [loadingPick, setLoadingPick] = useState(false);

  async function onPick(e) {
    e.preventDefault();
    if (!date) return;
    setLoadingPick(true);
    try {
      const r = await fetchByDate(date);
      setPicked(r);
    } catch (err) {
      alert(err.message || 'Failed to load date');
    } finally {
      setLoadingPick(false);
    }
  }

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error.message}</div>;

  const item = picked || data;

  return (
    <div>
      <h1>Today's APOD</h1>
      <section className="hero">
        {item.media_type === 'image' ? (
          <img src={item.hdurl || item.url} alt={item.title} className="hero-img" />
        ) : (
          <iframe title={item.title} src={item.url} className="hero-iframe" frameBorder="0" />
        )}

        <div className="hero-meta">
          <h2>{item.title}</h2>
          <p className="meta-muted">{item.date} {item.copyright ? ` — © ${item.copyright}` : ''}</p>
          <p>{item.explanation}</p>
        </div>
      </section>

      <hr />

      <form className="date-form" onSubmit={onPick}>
        <label htmlFor="date">Pick a date:</label>
        <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit" disabled={loadingPick}>{loadingPick ? 'Loading…' : 'Load'}</button>
        {picked && <button type="button" onClick={() => setPicked(null)}>Reset</button>}
      </form>
    </div>
  );
}
