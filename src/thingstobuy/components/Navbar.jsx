import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { startLogout } from "../../store/auth/thunks";
import { navigateToMenu, setUserFound, setUsers } from "../../store/thingstobuy";

export const Navbar = () => {
  const { displayName } = useSelector((status) => status.auth);

  const dispatch = useDispatch();

  const handleOnLogout = () => {
    dispatch(startLogout());
    dispatch(setUsers([]));
  };

  const onBrandClick = () => {
    dispatch(navigateToMenu());
    dispatch(setUserFound(true));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid ms-4 me-3">
        <Link to={`/groups`} className="navbar-brand" onClick={onBrandClick}>
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
