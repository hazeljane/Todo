import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import espressoImg from "./assets/espresso.png";
import refresherImg from "./assets/refreshercoffee.png";
import teaImg from "./assets/teacoffee.png";
import blendedImg from "./assets/chocolate.png";
import pastryImg from "./assets/pastry.png";
import CartIcon from "./CartIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function CoffeeShop({ totalItems }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);

  // Style placeholders (replace or add your actual styles)
  const buttonStyle = {
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "0",
  };
  const imgStyle = {
    width: "110px",
    height: "150px",
    
  };
  const labelStyle = {
    marginTop: "0.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
    background:"#916C54",
    padding: "10px",
    width:"180px",
    borderRadius: "15px",
    border: "3px solid black",
    letterSpacing: "1px",
    fontFamily: "Sansita Swashed"
  };
  const floatingMenuStyle = {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    zIndex: 1000,
  };
  const hiddenStyle = {
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(20px)",
    transition: "opacity 0.3s, transform 0.3s",
  };
  const visibleStyle = {
    opacity: 1,
    pointerEvents: "auto",
    transform: "translateY(0)",
    transition: "opacity 0.3s, transform 0.3s",
  };
  const menuButtonStyle = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#5a3e1b",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  const products = [
    { key: "espresso", label: "Espresso", img: espressoImg, area: "espresso" },
    { key: "refresher", label: "Refresher", img: refresherImg, area: "refresher" },
    { key: "tea", label: "Tea", img: teaImg, area: "tea" },
    { key: "pastry", label: "Pastry", img: pastryImg, area: "pastry" },
    { key: "blended", label: "Blended Beverage", img: blendedImg, area: "blended" },
  ];

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      paddingBottom: "80px",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "40px", marginBottom: "40px" }}>Products</h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 150px)",
        gridTemplateRows: "auto auto",
        gridTemplateAreas: `
          ". espresso refresher tea ."
          ". . blended pastry ."
        `,
        justifyContent: "center",
        width: "max-content",
        gap: "100px 90px",
        background: "none",
      }}
    >
      {products.map(({ key, label, img, area }) => (
        <div
          key={key}
          style={{
            gridArea: area,
            justifySelf: "center",
            alignSelf: "center",
            display: "flex",
            marginTop: "0", 
            flexDirection: "column",
            alignItems: "center",
            background: "none",
            padding: "10px",
            width: "150px",
            height: "115px",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={() => navigate(`/${key}`)}
            style={buttonStyle}
            aria-label={label}
            title={label}
          >
            <img src={img} alt={label} style={imgStyle} />
            <div style={labelStyle}>{label}</div>
          </button>
        </div>
      ))}
    </div>

    <div style={floatingMenuStyle}>

        <button
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
          aria-label="Back to Home"
          title="Back to Home"
          style={{
            ...menuButtonStyle,
            width: "50px",
            height: "50px",
            background: "#eee",
            color: "#5a3e1b",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            ...(!menuOpen ? hiddenStyle : visibleStyle),
          }}
        >
          <FontAwesomeIcon icon={faHouse} />
          
        </button>

        <button
          onClick={() => navigate("/cart")}
          aria-label="Go to Cart"
          title="Go to Cart"
          style={{
            ...menuButtonStyle,
            backgroundColor: "#5a3e1b",

            color: "white",
            ...(!menuOpen ? hiddenStyle : visibleStyle),
            transitionDelay: menuOpen ? "0.1s" : "0s",
          }}
        >
          <CartIcon totalItems={totalItems} />
        </button>

        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          title={menuOpen ? "Close menu" : "Open menu"}
          style={menuButtonStyle}
        >
          {menuOpen ? (
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
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
              <line x1="3" y1="12" x2= "21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
