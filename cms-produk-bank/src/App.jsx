import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HasamitraLandingPage from './HasamitraLandingPage';
import MainApp from './MainApp';
import ProductInfoPage from './components/ProductInfoPage';
import PromoPage from './components/PromoPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HasamitraLandingPage />} />
        <Route path="/main" element={<MainApp />} />
        <Route path="/informasi-produk" element={<ProductInfoPage />} />
        <Route path="/promo" element={<PromoPage />} />
      </Routes>
    </Router>
  );
}
