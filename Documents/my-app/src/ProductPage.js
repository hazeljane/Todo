import React, { useState, useEffect } from 'react';

function ProductPage() {
  const [userId] = useState('66501e8d87227f0ad276eb4a');
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch products
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch user's cart count
  useEffect(() => {
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then(res => res.json())
      .then(cart => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(err => console.error(err));
  }, [userId]);

  // Add to cart
  const addToCart = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/cart/${userId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    if (res.ok) {
      setCartCount(prev => prev + 1); // simple increment (or you could re-fetch)
      alert('Product added to cart!');
    } else {
      const error = await res.json();
      alert('Failed to add to cart: ' + error.message);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <header>
        <h1 style={styles.heading}>Products</h1>
        <div style={{ float: 'right' }}>
          🛒 Cart ({cartCount})
        </div>
      </header>

      <div style={styles.productsContainer}>
        {products.map(product => (
          <div key={product._id} style={styles.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button style={styles.button} onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  productsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    width: '200px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProductPage;
