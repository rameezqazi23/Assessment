import React from "react";

const Button = ({ text, onClick, disabled, selectedOption }) => {
  return (
    <>
      <button
        className={`mt-6 w-full p-3 rounded-md text-lg font-bold transition-all ${
          selectedOption
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
