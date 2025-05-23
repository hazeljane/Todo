import React, { useEffect, useState } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);
  const userId = localStorage.getItem('userId');
useEffect(() => {
  if (userId) {
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then(res => res.json())
      .then(cart => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(err => console.error(err));
  }
}, [userId]);


return (
  <div style={{ padding: '2rem' }}>
    <h1>Your Cart</h1>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.productId?.name || 'Unknown Product'} — Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    )}
  </div>
);

}

export default CartPage;
