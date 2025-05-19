import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function AddToCart({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();

  const allItems = Object.entries(cart).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  );

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [swipedItem, setSwipedItem] = useState(null);

  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const swipingKey = useRef(null);

  const toggleItem = (key) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const handleQuantityChange = (item, newQty) => {
    const qty = parseInt(newQty, 10);
    if (!isNaN(qty) && qty > 0) {
      updateQuantity(item.id, item.category, qty);
    }
  };

  const selectedArray = allItems.filter(item =>
    selectedItems.has(`${item.category}-${item.id}`)
  );

  const total = selectedArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSelected = () => {
    if (selectedArray.length === 0) {
      alert("Please select at least one item to order.");
      return;
    }

    navigate("/payment", { state: { selectedItems: selectedArray } });

    selectedArray.forEach((item) => {
      removeFromCart(item.id, item.category);
    });
  };

  const handleGoToHistory = () => {
    navigate("/history");
  };

  const handleTouchStart = (e, key) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    touchCurrentX.current = touchStartX.current;
    swipingKey.current = key;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current || !swipingKey.current) return;
    touchCurrentX.current = e.touches ? e.touches[0].clientX : e.clientX;
    const diffX = touchStartX.current - touchCurrentX.current;

    if (diffX > 50) setSwipedItem(swipingKey.current);
    else if (diffX < 0) setSwipedItem(null);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !swipingKey.current) return;
    const diffX = touchStartX.current - touchCurrentX.current;
    if (diffX > 100) setSwipedItem(swipingKey.current);
    else setSwipedItem(null);

    touchStartX.current = 0;
    touchCurrentX.current = 0;
    swipingKey.current = null;
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>🛒 Your Cart</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => navigate("/coffee")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg> Back
        </button>
        <button onClick={handleGoToHistory}>View Order History</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {allItems.map((item) => {
          const key = `${item.category}-${item.id}`;
          const isSwiped = swipedItem === key;

          return (
            <li
              key={key}
              style={{
                position: "relative",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fefefe",
                overflow: "hidden",
                userSelect: "none",
                height: "80px",
                color: "black"
              }}
              onTouchStart={(e) => handleTouchStart(e, key)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={(e) => handleTouchStart(e, key)}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              {/* Delete button */}
              <button
                onClick={() => removeFromCart(item.id, item.category)}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: "150px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  zIndex: isSwiped ? 2 : -1,
                  opacity: isSwiped ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  borderRadius: "0 8px 8px 0",
                }}
                aria-label={`Delete ${item.name}`}
              >
                🗑️ Delete
              </button>

              {/* Item content with sliding effect */}
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  transform: isSwiped ? "translateX(-150px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.has(key)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleItem(key);
                  }}
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                />
                <div style={{ flex: "1 1 auto" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{item.name}</div>
                  <div>${(item.price ?? 0).toFixed(2)}</div>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(item, e.target.value);
                  }}
                  style={{ width: "60px", marginLeft: "1rem", textAlign: "center" }}
                />
              </div>
            </li>
          );
        })}
      </ul>

<div style={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "left", marginTop: "2rem" }}>
  Total: ${!isNaN(total) ? total.toFixed(2) : "0.00"}
</div>


      <button
        onClick={handleOrderSelected}
        disabled={selectedArray.length === 0}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          backgroundColor: selectedArray.length === 0 ? "#ccc" : "#28a745",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: selectedArray.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        Order Selected Items
      </button>
    </div>
  );
}
