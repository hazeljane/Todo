import React from "react";
import mocha from "./assets/strawberry2.png";
import mogito from "./assets/mogito.png";
import cocktail from "./assets/cocktail.png";
import green from "./assets/green.png";
import { useNavigate } from "react-router-dom";
const refresherProducts = [
  { id: 1, name: "Cocktail", price:129.99, image: cocktail},
  { id: 2, name: "Mogito", price: 130.50, image: mogito},
  { id: 3, name: "Mocha", price: 220.90, image: mocha },
  { id: 4, name: "Green", price: 159.00, image: green },
];

export default function Refresher({ addToCart }) {
  const navigate = useNavigate();
  return (
    <div style ={{
      display:"flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <h1 onClick={() => navigate("/coffee")}
        style={{ 
          padding:"5px 0",
          width:"300px",
          borderRadius: "10px",
          textAlign: "center",
          background: "#A17557",
          border: "2px solid black",
          cursor: "pointer", 
          fontFamily: "Sansita Swashed,cursive",}}>Refresher Menu</h1>
      <ul style={{
        marginTop:"50px",
        display: "flex",
        justifyContent: "space-around",
        width:"80%",
        }}>
        {refresherProducts.map((product) => (
          <li key={product.id} style={{ 
            marginBottom: "1rem",
            background: "#9D8F86",
            padding: "10px",
            height: "180px",
            width: "200px",
            boxShadow: "0 4px 4px #603417",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "wheat"
            }}>
            
            <button 
            style ={{
                marginTop:"-30px",
                borderRadius: "50%",
                padding:"5px",
                border: "2px solid black",
                boxShadow: "0 0 10px inset black",
                background: "white",
                width: "50px",
                height:"50px",
                fontSize:"24px",
              }}
              onClick={() => addToCart({ ...product, quantity: 1 }, "refresher")}
            
            >
              🛒
            </button>
            <div style={{ }} >
              ${product.price.toFixed(2)}
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ marginTop: "220px",position: "absolute",width: "95px", height: "auto", borderRadius: "10px" }}
            />
            
            <div style={{
             fontFamily: "Sansita Swashed,cursive",
             fontWeight: "bold",
             position: "absolute",
             marginTop: "410px",
             color: "wheat"
              }}>
              {product.name}
          </div>
          
          </li>
        ))}
      </ul>
    </div>
  );
}
