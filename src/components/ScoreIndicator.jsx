import React from "react";

const ScoreIndicator = ({ current, total }) => {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          color: "#4B5563",
          marginTop: "16px",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Score: {((current / total) * 100).toFixed(1)}%
      </p>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "25px",
          backgroundColor: "#D1D5DB",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#3B82F6",
            width: `${((current) / total) * 100}%`,
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreIndicator;
