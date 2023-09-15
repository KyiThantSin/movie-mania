import React from "react";

const Skeleton = () => {
  return (
    <div className="container p-5 w-80 h-96 rounded-md bg-card flex justify-center flex-col gap-5 animate-pulse">
      <div className="w-70 h-60 bg-gray-300 rounded-lg"></div>
      <div className="h-8 bg-gray-300 rounded-lg"></div>
      <div className="h-8 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default Skeleton;
