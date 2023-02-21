import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startLogout } from "../../store/auth/thunks";

export const Navbar = () => {
  const { displayName, uid } = useSelector((status) => status.auth);

  const dispatch = useDispatch();

  const handleOnLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav>
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <Link to={`/groups`} className="navbar-brand">
          <i className="fas fa-user"></i>
          &nbsp; {displayName}
        </Link>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-outline-light" onClick={handleOnLogout}>
            <span>
              <i className="fas fa-sign-out-alt"></i>
              &nbsp; Salir
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
