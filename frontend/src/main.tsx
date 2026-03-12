import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Header from './pages/partials/Header';
import Footer from './pages/partials/Footer';
import Router from './Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Router />
    <Footer />
  </StrictMode>
);