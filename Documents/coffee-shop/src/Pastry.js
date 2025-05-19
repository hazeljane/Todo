import React from "react";
import mocha from "./assets/cheesepuff.png";
import latte from "./assets/cream puff.png";
import honey from "./assets/honey.png";
import strawberry from "./assets/strawberrypastry.png"
import { useNavigate } from "react-router-dom";

const espressoProducts = [
  { id: 1, name: "Strawberry", price:129.99, image: strawberry },
  { id: 2, name: "Honey ", price: 130.50, image: honey },
  { id: 3, name: "Cheese Puff", price: 220.90, image: mocha },
  { id: 4, name: "Vanilla Puff", price: 159.00, image: latte },
];

export default function Pastry({ addToCart }) {
  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column"
    }}>
      <h1 onClick={() => navigate("/coffee")}
        style={{ padding:"5px 0",
          textAlign:"center",
          width:"300px",
          borderRadius: "10px",
          background: "#A17557",
          border: "2px solid black",
          cursor: "pointer", 
          fontFamily: "Sansita Swashed,cursive",}}>Pastry Menu</h1>
      <ul style={{
        display: "flex",
        justifyContent: "space-around",
        width:"80%",
        marginTop:"50px"
        }}>
        {espressoProducts.map((product) => (
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
                borderRadius: "50%",
                padding:"5px",
                border: "2px solid white",
                boxShadow: "0 0 2px black",
                background: "white",
                width: "35px",

              }}
              onClick={() => addToCart({ ...product, quantity: 1 }, "pastry")}
            >
              🛒
            </button>
            <div style={{ }} >
              ${product.price.toFixed(2)}
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ marginTop: "210px",position: "absolute",width: "150px", height: "auto", borderRadius: "10px" }}
            />
  
            
            <div style={{
             fontFamily: "Sansita Swashed,cursive",
             fontWeight: "bold",
             position: "absolute",
             marginTop: "390px",
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
