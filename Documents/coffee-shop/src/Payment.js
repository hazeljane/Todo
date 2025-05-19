import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment({
  cart,
  addOrderToHistory,
  removeOrderedItemsFromCart,
  clearCart,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedItems = location.state?.selectedItems || [];

  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [confirmed, setConfirmed] = useState(false);

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("No items to order.");
      navigate("/cart");
      return;
    }

    addOrderToHistory(selectedItems, paymentMethod);

    removeOrderedItemsFromCart(selectedItems);

    setConfirmed(true);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Payment Options
      </h1>

      {confirmed ? (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#28a745" }}>✅ Order Confirmed!</h2>
          <p style={{ fontSize: "1.1rem" }}>
            You chose:{" "}
            <strong>
              {paymentMethod === "gcash" ? "Gcash" : "Pay on Delivery"}
            </strong>
          </p>
          <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            ☕ Thank you for your order! Your delicious drinks & snacks will be
            with you soon.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "1.5rem",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </button>
        </div>
      ) : selectedItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#555" }}>
          No items selected. Please add items to your cart first.
        </p>
      ) : (
        <>
          <h3 style={{ color: "black",borderBottom: "2px solid #eee", paddingBottom: "0.5rem" }}>
            Your Order:
          </h3>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              maxHeight: "250px",
              overflowY: "auto",
              marginBottom: "1rem",
              color:"burlywood"
            }}
          >
            {selectedItems.map((item) => (
              <li
                key={`${item.category}-${item.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span style={{ fontWeight: "600" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <h3
            style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "1.3rem",
              marginBottom: "1.5rem",
              color:"brown",
            }}
          >
            Total: ${totalPrice.toFixed(2)}
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontSize: "1rem",
              color: "#333",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="gcash"
                checked={paymentMethod === "gcash"}
                onChange={() => setPaymentMethod("gcash")}
              />
              <span>Gcash</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Cash on Delivery</span>
            </label>

            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Confirm Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
