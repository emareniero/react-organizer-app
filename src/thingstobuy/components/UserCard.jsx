import React from "react";

export const UserCard = ({ displayName, email }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{displayName}</h5>
              <p className="card-text">{email}</p>
            </div>
            <div className="col d-flex justify-content-end">
              <button className="btn btn-primary">Invitar al grupo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
