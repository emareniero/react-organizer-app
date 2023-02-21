import React from "react";

export const CheckingAuth = () => {
  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="d-flex justify-content-center p-2">
          <div className="spinner-grow text-primary" role="status"></div>
        </div>
        <span className="d-flex justify-content-center">Loading...</span>
      </div>
    </>
  );
};
