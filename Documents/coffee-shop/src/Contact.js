import React from "react";
import SimpleNavbar from "./SimpleNavbar";

export default function Contact() {
  const pageStyle = {
    backgroundColor: "#4b3621", // deep coffee brown background
    minHeight: "100vh",
    padding: "3rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Akaya Telivigala', cursive",
    color: "#f3e9dc", // creamy text color
  };

  const formStyle = {
    background: "#60371C",
    padding: "30px 25px",
    borderRadius: "25px",
    border: "6px solid #4b3621",
    boxShadow: "0 0 15px inset rgba(0,0,0,0.7)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  };

  const inputStyle = {
    width: "90%",
    padding: "12px",
    margin: "10px 0 20px",
    borderRadius: "8px",
    border: "2px solid #6f4e37",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
  };

  const btnStyle = {
    backgroundColor: "#947848",
    color: "wheat",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: "'Akaya Telivigala', cursive",
  };

  return (
    <div style={pageStyle}>
      <SimpleNavbar />
      <h2 style={{ marginBottom: "1rem" }}>Contact Us</h2>
      <form style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          style={inputStyle}
          required
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          style={{ ...inputStyle, resize: "none" }}
          required
        />
        <button type="submit" style={btnStyle}>
          Send Message
        </button>
      </form>
    </div>
  );
}
