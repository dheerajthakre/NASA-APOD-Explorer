import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import Gallery from '../pages/Gallery';
import DetailView from '../pages/DetailView';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/detail/:date" element={<DetailView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
