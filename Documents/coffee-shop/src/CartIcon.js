import React from "react";

export default function CartIcon({ totalItems }) {
  return (
    <div style={{ position: "relative", width: 40, height: 40, cursor: "pointer" }}>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        style={{ width:40, height:40, color: "white" }}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {totalItems > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#e53935",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            userSelect: "none",
          }}
        >
          {totalItems}
        </div>
      )}
    </div>
  );
}
