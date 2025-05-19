import React from "react";
import mocha from "./assets/tea1.png";
import teaImg from "./assets/teacoffee.png";
import refresher from "./assets/refresher.png";
import jasmine from "./assets/jasmine.png";
import { useNavigate } from "react-router-dom";
const espressoProducts = [
  { id: 1, name: "Green Tea", price:129.99, image: refresher },
  { id: 2, name: "Jasmine Tea", price: 130.50, image: jasmine},
  { id: 3, name: "Yellow Tea", price: 220.90, image: mocha },
  { id: 4, name: "Black Tea", price: 159.00, image: teaImg },
];

export default function Tea({ addToCart }) {
  const navigate = useNavigate();
  return (
    <div style ={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column"
    }}>
      <h1
        onClick={() => navigate("/coffee")}
        style={{ 
          padding:"5px 0",
          width:"300px",
          borderRadius: "10px",
          textAlign: "center",
          background: "#A17557",
          border: "2px solid black",
          cursor: "pointer", 
          fontFamily: "Sansita Swashed,cursive", }}
      >
        Tea Menu
      </h1>
      <ul style={{
        width:"80%",
        marginTop: "50px",
        display: "flex",
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
              onClick={() => addToCart({ ...product, quantity: 1 }, "tea")}
            >
              🛒
            </button>
            <div style={{ }} >
              ${product.price.toFixed(2)}
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ marginTop: "170px",position: "absolute",width: "110px", height: "auto", borderRadius: "10px" }}
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
