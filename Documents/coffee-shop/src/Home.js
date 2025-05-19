import React from "react";
import main from "./assets/main.jpg";
import coffeeLogo from "./assets/jasmine.png";
import CircularText from "./CircularText";
import SimpleNavbar from "./SimpleNavbar";
import { Link } from "react-router-dom";

export default function Home() {
  const btnStyle = {
    padding: "12px 0",
    background: "#6f4e37", // rich coffee brown
    color: "wheat",
    borderRadius: "25px",
    width: "220px",
    border: "2px solid #4b3621",
    fontFamily: "'Sansita Swashed', cursive",
    fontSize: "1.1rem",
    boxShadow: "0 4px 8px rgba(111, 78, 55, 0.4)",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const btnHoverStyle = {
    background: "#4b3621",
    borderColor: "#6f4e37",
  };

  const radius = 110;

  const containerStyle = {
    display: "flex",
    padding: "1.5rem",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#fff7f0",
    minHeight: "100vh",
    color: "#4b3621",
    alignItems: "center",
    gap: "2rem",
  };

  const leftImageStyle = {
    width: "50%",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "5px 5px 15px rgba(111, 78, 55, 0.3)",
  };

  const rightContentStyle = {
    width: "50%",
    textAlign: "center",
    padding: "1rem 2rem",
  };

  const circularTextTopStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: "'Ribeye Marrow', cursive",
    color: "#6f4e37",
    filter: "drop-shadow(0 0 1px #4b3621)",
  };

  const circularTextBottomStyle = {
    position: "absolute",
    top: "calc(40% - 60px)",
    left: 0,
    fontFamily: "'Ribeye Marrow', cursive",
    color: "#6f4e37",
    filter: "drop-shadow(0 0 1px #4b3621)",
  };

  const [btnHover, setBtnHover] = React.useState(false);

  return (
    <div style={containerStyle}>
      {/* Left image */}
      <img
        src={main}
        alt="Coffee Shop Main"
        style={leftImageStyle}
      />

      <div style={rightContentStyle}>
        <SimpleNavbar />

        <div
          style={{
            position: "relative",
            width: `${radius * 2}px`,
            height: `${radius * 2 + 40}px`,
            margin: "2rem auto",
          }}
        >
          {/* Top curved text */}
          <div style={circularTextTopStyle}>
            <CircularText
              text="The Daily Grind"
              radius={radius}
              startAngle={180}
              endAngle={0}
              invert={false}
              rotateLetters={false}
            />
          </div>

          <img
            src={coffeeLogo}
            alt="Coffee Logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "150px",
              height: "150px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              boxShadow: "0 0 15px rgba(111, 78, 55, 0.6)",
              border: "4px solid #6f4e37",
              backgroundColor: "#f3e9dc",
            }}
          />

          <div style={circularTextBottomStyle}>
            <CircularText
              text="Coffee House"
              radius={radius}
              startAngle={180}
              endAngle={360}
              invert={true}
              rotateLetters={false}
            />
          </div>
        </div>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#6f4e37",
            maxWidth: "280px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.4",
          }}
        >
          When placing an order, select the option<br />
          <b>"Contactless delivery"</b> and the courier will leave your order at the door.
        </p>
        <Link to="/coffee">
  <button
    style={btnHover ? { ...btnStyle, ...btnHoverStyle } : btnStyle}
    onMouseEnter={() => setBtnHover(true)}
    onMouseLeave={() => setBtnHover(false)}
  >
    ORDER NOW
  </button>
</Link>

      </div>
    </div>
  );
}
