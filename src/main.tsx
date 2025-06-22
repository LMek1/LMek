import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Layout from './components/Layout';
import './index.css';
import { CartProvider } from './CartContext';
import CategoryPage from './pages/CategoryPage';
import TrackPage from './pages/TrackPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SuccessPage from './pages/SuccessPage';
import { HashRouter } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQsPage from './pages/FAQsPage';
import CancelPage from './pages/CancelPage'; // ⬅️ Importar




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout><App /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/category/:category" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/track" element={<Layout><TrackPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
          <Route path="/success" element={<Layout><SuccessPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/faqs" element={<Layout><FAQsPage /></Layout>} />
          <Route path="/cancel" element={<Layout><CancelPage /></Layout>} />
        </Routes>
     </HashRouter>
    </CartProvider>
  </StrictMode>
);
