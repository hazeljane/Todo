import React from "react";
import matcha from "./assets/matcha.png";
import mogito from "./assets/mogito.png";
import caramel from "./assets/Caramel2.png";
import strawberry from "./assets/strawberry.png";
import chocolate from "./assets/chocolatemint.png";
import { useNavigate } from "react-router-dom";

const blendedProducts = [
  { id: 1, name: "Cream Fappucino", price:129.99, image: strawberry },
  { id: 2, name: "Mogito", price: 130.50, image: chocolate},
  { id: 3, name: "Matcha", price: 220.90, image: matcha },
  { id: 4, name: "Caramel", price: 159.00, image: caramel },
];

export default function BlendedBeverage({ addToCart }) {
  const navigate = useNavigate();
  return (
    <div
    style={{
      textAlign:"center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }}>
      <h1 onClick={() => navigate("/coffee")}
        style={{ 
          padding:"5px 0",
          textAlign:"center",
          width:"300px",
          borderRadius: "10px",
          textAlign: "center",
          background: "#A17557",
          borderRadius: "5px",
          border: "2px solid black",
          cursor: "pointer", 
          fontFamily: "Sansita Swashed,cursive",
        }}>BlendedBeverage</h1>
      <ul style={{
        marginTop: "40px",
        display: "flex",
        width:"80%",
        justifyContent: "space-around"
        }}>
        {blendedProducts.map((product) => (
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
              style={{ marginTop: "220px",position: "absolute",width: "80px", height: "140px", borderRadius: "10px" }}
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
