import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Make sure to import BrowserRouter
import App from './App';

// This is the correct place to put the BrowserRouter to wrap the entire App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App /> {/* Your app components go inside BrowserRouter */}
  </BrowserRouter>
);
