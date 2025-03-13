import React from "react";

const Button = ({ text, onClick, disabled, selectedOption }) => {
  return (
    <button
      style={{
        marginTop: "24px",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "background-color 0.3s ease-in-out",
        backgroundColor: selectedOption ? "#22C55E" : "#D1D5DB",
        color: selectedOption ? "#FFFFFF" : "#6B7280",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseOver={(e) => {
        if (selectedOption) e.target.style.backgroundColor = "#16A34A";
      }}
      onMouseOut={(e) => {
        if (selectedOption) e.target.style.backgroundColor = "#22C55E";
      }}
    >
      {text}
    </button>
  );
};

export default Button;
