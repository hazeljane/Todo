import React from "react";
import SimpleNavbar from "./SimpleNavbar";

export default function About() {
  const pageStyle = {
    backgroundColor: "#4b3621",  // deep coffee brown
    minHeight: "100vh",          // full viewport height
    padding: "3rem 1rem",        // spacing around content
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Akaya Telivigala', cursive",
  };

  const labelStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    maxWidth: "1100px",
    width: "100%",
  };

  const card = {
    background: "#60371C",       // rich coffee color for card background
    color: "#f3e9dc",            // creamy text color
    padding: "30px 25px",
    fontSize: "22px",
    borderRadius: "25px",
    border: "6px solid #4b3621",
    boxShadow: "0 0 15px inset rgba(0,0,0,0.7)",
    flex: "1 1 400px",           // responsive width
    textAlign: "center",
    lineHeight: "1.5",
  };

  return (
    <div style={pageStyle}>
      <SimpleNavbar />
      <div style={labelStyle}>
        <p style={card}>
          At Daily Grind Coffee House, we believe that every cup of coffee tells a story.
          Nestled in the heart of Bongabong, we're more than just a coffee shop — we're a
          place where early risers, late-night thinkers, and weekend wanderers come together
          over expertly brewed coffee and handcrafted treats.
        </p>
        <p style={card}>
          Our passion for rich flavors and high-quality beans drives us to serve the best espresso,
          lattes, and cold brews in town. Whether you're here for a quick caffeine fix or a cozy spot
          to work and unwind, we've got you covered with our warm ambiance and friendly baristas.
        </p>
      </div>
    </div>
  );
}
