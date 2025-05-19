import React from "react";
import mocha from "./assets/mocha.png";
import latte from "./assets/tea.png";
import latte1 from "./assets/latte1.png";
import espressoImg from "./assets/espresso.png";
import { useNavigate } from "react-router-dom";
const espressoProducts = [
  { id: 1, name: "Caffe Macchiato", price:129.99, image: latte1 },
  { id: 2, name: "Capuccino", price: 130.50, image: espressoImg},
  { id: 3, name: "Mocha", price: 220.90, image: mocha },
  { id: 4, name: "Latte", price: 159.00, image: latte },
];

export default function Espresso({ addToCart }) {
  const navigate= useNavigate();
  return (
    <div style={{ 
        textAlign:"center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }}>
      <h1 onClick={() => navigate("/coffee")}
        style={{ 
          padding:"5px 0", 
          width:"300px",
          borderRadius: "10px",
          background: "#A17557", 
          border: "2px solid black",
          cursor: "pointer", 
          fontFamily: "Sansita Swashed,cursive",
        }}>Espresso</h1>
      <ul style={{
        marginTop: "40px",
        display: "flex",
        width:"80%",
        justifyContent: "space-around"
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
              onClick={() => addToCart({ ...product, quantity: 1 }, "espresso")}
            >
              🛒
            </button>
            <div style={{ }} >
              ${product.price.toFixed(2)}
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ marginTop: "180px",position: "absolute",width: "110px", height: "120px", borderRadius: "10px" }}
            />
  
            
            <div style={{
             fontFamily: "Sansita Swashed,cursive",
             fontWeight: "bold",
             position: "absolute",
             marginTop: "330px",
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
