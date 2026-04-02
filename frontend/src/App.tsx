import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

import Intro from './pages/Intro';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuPage from './pages/Menu';
import CartPage from './pages/Cart';
import OrdersPage from './pages/Orders';
import Admin from './pages/Admin';
import AdminMenuManagement from './pages/AdminMenuManagement.tsx';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.96)',
                color: '#1f2937',
                border: '1px solid rgba(251, 146, 60, 0.18)',
                boxShadow: '0 20px 50px rgba(124,45,18,0.14)',
                backdropFilter: 'blur(18px)'
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/intro" replace />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/menumanagement" element={<AdminMenuManagement />} />
            <Route path="*" element={<Navigate to="/intro" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
