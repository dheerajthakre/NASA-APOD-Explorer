import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchByDate } from '../api/apodApi';
import Loader from '../components/Loader';

export default function DetailView() {
  const { date } = useParams();
  const { data, loading, error } = useFetch(() => fetchByDate(date), [date]);

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error.message}</div>;

  const item = data;
  return (
    <div>
      <h1>{item.title}</h1>
      <p className="meta-muted">{item.date} {item.copyright ? ` — © ${item.copyright}` : ''}</p>
      {item.media_type === 'image' ? (
        <img src={item.hdurl || item.url} alt={item.title} className="detail-img" />
      ) : (
        <iframe title={item.title} src={item.url} className="detail-iframe" frameBorder="0" />
      )}
      <p className="detail-explanation">{item.explanation}</p>
    </div>
  );
}
