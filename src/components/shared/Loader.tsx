import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
        <p className="text-teal-600 text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
