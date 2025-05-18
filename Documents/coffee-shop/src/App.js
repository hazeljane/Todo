import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Home";
import CoffeeShop from "./CoffeeShop";
import Espresso from "./Espresso";
import Refresher from "./Refresher";
import Tea from "./Tea";
import Pastry from "./Pastry";
import BlendedBeverage from "./BlendedBeverage";
import About from "./About";
import Service from "./Service";
import AddToCart from "./AddToCart";
import Payment from "./Payment";
import History from "./History";
import Contact from "./Contact";
import "./App.css";

function App() {
  // Initialize cart from localStorage or empty categories
  const [cartItems, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : { espresso: [], refresher: [], tea: [], pastry: [], blended: [] };
  });

  // Initialize order history from localStorage or empty
  const [orderHistory, setOrderHistory] = useState(() => {
    const savedHistory = localStorage.getItem("orderHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Persist cartItems to localStorage when changed
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist orderHistory to localStorage when changed
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Clear cart helper
  const clearCart = () => {
    setCart({
      espresso: [],
      refresher: [],
      tea: [],
      pastry: [],
      blended: [],
    });
  };

  // Add single item to cart by category, merging quantity if item exists
  const addToCart = (item, category) => {
    setCart((prev) => {
      const updatedCategory = Array.isArray(prev[category]) ? [...prev[category]] : [];
      const index = updatedCategory.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        updatedCategory[index] = {
          ...updatedCategory[index],
          quantity: (updatedCategory[index].quantity || 1) + (item.quantity || 1),
        };
      } else {
        updatedCategory.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      return { ...prev, [category]: updatedCategory };
    });
  };

  // Remove item by id from a category
  const removeFromCart = (id, category) => {
    setCart((prev) => {
      const updatedCategory = prev[category].filter((item) => item.id !== id);
      return { ...prev, [category]: updatedCategory };
    });
  };

  // Update quantity for a specific item in a category
  const updateQuantity = (id, category, newQty) => {
    setCart((prev) => {
      const updatedCategory = prev[category].map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
      return { ...prev, [category]: updatedCategory };
    });
  };

  // Add multiple items at once to a category (used for re-adding from history)
  const addMultipleToCart = (items, category) => {
    setCart((prev) => {
      let updatedCategory = [...(prev[category] || [])];
      items.forEach((item) => {
        const exists = updatedCategory.find((i) => i.id === item.id);
        if (exists) {
          updatedCategory = updatedCategory.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          updatedCategory.push(item);
        }
      });
      return { ...prev, [category]: updatedCategory };
    });
  };

  // After an order is placed, remove ordered quantities from cart
  const removeOrderedItemsFromCart = (orderedItems) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      Object.keys(updatedCart).forEach((category) => {
        updatedCart[category] = updatedCart[category]
          .map((cartItem) => {
            const orderedItem = orderedItems.find(
              (oi) => oi.id === cartItem.id && oi.category === category
            );

            if (orderedItem) {
              const newQty = (cartItem.quantity || 0) - (orderedItem.quantity || 0);
              if (newQty > 0) {
                return { ...cartItem, quantity: newQty };
              }
              return null; // remove item if quantity <= 0
            }
            return cartItem;
          })
          .filter(Boolean);
      });

      return updatedCart;
    });
  };

  // Add new order to history with date and payment info
  const addOrderToHistory = (orderedItems, paymentMethod = "Pay on Delivery") => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      paymentMethod,
      items: orderedItems,
    };
    setOrderHistory((prev) => [...prev, newOrder]);
  };

  // Calculate total number of items in cart
  const totalItems = Object.values(cartItems).reduce(
    (sum, categoryItems) =>
      sum + categoryItems.reduce((catSum, item) => catSum + item.quantity, 0),
    0
  );

  // Clear all order history
  const clearHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem("orderHistory");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />

        {/* CoffeeShop route passes addToCart & totalItems */}
        <Route
          path="/coffee"
          element={<CoffeeShop addToCart={addToCart} totalItems={totalItems} />}
        />

        {/* Individual category pages with addToCart */}
        <Route path="/espresso" element={<Espresso addToCart={addToCart} />} />
        <Route path="/refresher" element={<Refresher addToCart={addToCart} />} />
        <Route path="/tea" element={<Tea addToCart={addToCart} />} />
        <Route path="/pastry" element={<Pastry addToCart={addToCart} />} />
        <Route path="/blended" element={<BlendedBeverage addToCart={addToCart} />} />

        {/* Cart page */}
        <Route
          path="/cart"
          element={
            <AddToCart
              cart={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />

        {/* Payment page */}
        <Route
          path="/payment"
          element={
            <Payment
              cart={cartItems}
              addOrderToHistory={addOrderToHistory}
              clearCart={clearCart}
              removeOrderedItemsFromCart={removeOrderedItemsFromCart}
            />
          }
        />

        {/* Order history page */}
        <Route
          path="/history"
          element={
            <History
              orderHistory={orderHistory}
              addMultipleToCart={addMultipleToCart}
              clearHistory={clearHistory}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
