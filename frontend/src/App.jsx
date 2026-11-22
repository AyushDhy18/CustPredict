import React from 'react';
import Sidebar from './components/layout/Sidebar';
import NavBar from './components/layout/NabBar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Predictions from './pages/Predictions';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
<div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <NavBar />

          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </div>
        </div>
      </div>  
  );
};

export default App;