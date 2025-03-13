import React from "react";

const ScoreIndicator = ({ current, total }) => {
  return (
    <>
      <p className="text-center text-gray-600 mt-4 text-lg font-medium">
        Score: {((current / total) * 100).toFixed(1)}%
      </p>
      <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${((current + 1) / total) * 100}%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default ScoreIndicator;
