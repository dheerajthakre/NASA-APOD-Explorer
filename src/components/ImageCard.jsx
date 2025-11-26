import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageCard({ item }) {
  const thumb = item.media_type === 'image' ? item.url : null;
  return (
    <article className="card">
      {thumb ? (
        <img src={thumb} alt={item.title} className="card-img" />
      ) : (
        <div className="card-img card-placeholder">No image</div>
      )}
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-date">{item.date}</p>
        <Link to={`/detail/${item.date}`} className="card-link">View details →</Link>
      </div>
    </article>
  );
}
