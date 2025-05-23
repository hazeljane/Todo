import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart"
        element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
 