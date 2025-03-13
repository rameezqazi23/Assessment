import React from "react";

const Progress = ({ current, total }) => {
  console.log("Check", { current, total });
  return (
    <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{
          width: `${((current + 1) / total) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default Progress;
