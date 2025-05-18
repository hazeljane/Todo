import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SimpleNavbar() {
  const location = useLocation();

  const baseStyle = {
    fontFamily: "'Akshar', sans-serif",
    fontWeight: "600",
    fontSize: "24px",
    color: "#6f4e37", // warm coffee brown
    textDecoration: "none",
    paddingBottom: "4px",
    transition: "color 0.3s ease, border-bottom 0.3s ease",
    borderBottom: "3px solid transparent",
  };

  const activeStyle = {
    fontSize: "28px",
    color: "#947848", // golden coffee tone
    borderBottom: "3px solid #947848",
  };

  const hoverStyle = {
    color: "#a57c4d",
  };

  const isActive = (path) =>
    location.pathname === path ? activeStyle : {};

  return (
    <nav
      style={{
        fontFamily: "'Akshar', sans-serif",
        display: "flex",
        gap: "3.5rem",
        padding: "1rem 2rem",
        background: "none",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
      aria-label="Primary navigation"
    >
      {[
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ].map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          style={{ ...baseStyle, ...isActive(to) }}
          aria-current={location.pathname === to ? "page" : undefined}
          onMouseEnter={(e) => {
            e.target.style.color = hoverStyle.color;
            if (location.pathname !== to) {
              e.target.style.borderBottom = "3px solid #a57c4d";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.color =
              location.pathname === to ? activeStyle.color : baseStyle.color;
            e.target.style.borderBottom =
              location.pathname === to ? activeStyle.borderBottom : "3px solid transparent";
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
