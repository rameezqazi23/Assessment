import React from "react";

const Progress = ({ current, total }) => {
  console.log("Check", { current, total });
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "12px",
        backgroundColor: "#D1D5DB",
        borderRadius: "999px",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#3B82F6",
          width: `${(current / total) * 100}%`,
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default Progress;
