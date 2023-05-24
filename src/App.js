import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss'

import Header from './components/Header';
import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route
              path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
