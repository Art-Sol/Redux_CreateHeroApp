import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-border mx-auto mt-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
