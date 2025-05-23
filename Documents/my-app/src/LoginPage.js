import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {  // your backend login route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('Login failed: ' + data.error);
        return;
      }

      alert('Login successful!');
      navigate('/products');
    } catch (err) {
      alert('Request error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }} 
        />
        <label>Password:</label><br />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }} 
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
