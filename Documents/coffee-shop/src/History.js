import React from "react";
import { useNavigate } from "react-router-dom";

export default function History({ orderHistory, addMultipleToCart, clearHistory }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#4a90e2",
          letterSpacing: "0.05em",
        }}
      >
        📜 Order History
      </h1>

      {orderHistory.length === 0 ? (
        <p
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            marginTop: "4rem",
            color: "#777",
          }}
        >
          No orders yet. Start shopping and your history will appear here.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.8rem",
          }}
        >
          {orderHistory
            .slice()
            .reverse()
            .map((order, index) => {
              const total = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 8px rgba(74, 144, 226, 0.15), 0 2px 4px rgba(0,0,0,0.05)",
                    padding: "1.6rem 2rem",
                    transition: "box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(74, 144, 226, 0.25), 0 5px 10px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(74, 144, 226, 0.15), 0 2px 4px rgba(0,0,0,0.05)";
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      marginBottom: "1rem",
                      color: "#2c3e50",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Order #{orderHistory.length - index} •{" "}
                    <span style={{ color: "#4a90e2", fontWeight: "600" }}>
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </span>{" "}
                    • <em style={{ fontWeight: "400", color: "#666" }}>{order.date}</em>{" "}
                    • <strong>{order.paymentMethod}</strong>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      maxHeight: "180px",
                      overflowY: "auto",
                      borderTop: "1px solid #e1e8f0",
                      borderBottom: "1px solid #e1e8f0",
                      paddingTop: "0.75rem",
                      paddingBottom: "0.75rem",
                    }}
                  >
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.35rem 0",
                          borderBottom: "1px solid #f1f4f8",
                          fontSize: "1rem",
                          color: "#34495e",
                        }}
                      >
                        <span
                          style={{ flex: "1 1 auto", fontWeight: "600" }}
                          title={item.name}
                        >
                          {item.name.length > 30
                            ? item.name.slice(0, 27) + "..."
                            : item.name}
                        </span>
                        <span style={{ minWidth: "80px", textAlign: "center" }}>
                          Qty: {item.quantity}
                        </span>
                        <span
                          style={{
                            minWidth: "90px",
                            textAlign: "right",
                            fontWeight: "700",
                            color: "#27ae60",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      marginTop: "1rem",
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      color: "#2c3e50",
                      textAlign: "right",
                    }}
                  >
                    Total: ${total.toFixed(2)}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {orderHistory.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            onClick={() => clearHistory()}
            style={{
              backgroundColor: "#e74c3c",
              border: "none",
              color: "white",
              fontSize: "1rem",
              padding: "10px 25px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(231, 76, 60, 0.6)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
          >
            Clear History
          </button>

          <button
            onClick={() => {
              // Re-add all past orders to cart (flatten all items)
              const allItems = orderHistory.flatMap((order) =>
                order.items.map((item) => ({ ...item }))
              );
              addMultipleToCart(allItems, "espresso"); 
              navigate("/cart");
            }}
            style={{
              backgroundColor: "#4a90e2",
              border: "none",
              color: "white",
              fontSize: "1rem",
              padding: "10px 25px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 4px 15px rgba(74, 144, 226, 0.5)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
          >
            Reorder All
          </button>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => navigate("/coffee")}
          style={{
            backgroundColor: "#4a90e2",
            border: "none",
            color: "white",
            fontSize: "1.1rem",
            padding: "12px 30px",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 4px 15px rgba(74, 144, 226, 0.5)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
        >
          ← Back 
        </button>
      </div>
    </div>
  );
}
