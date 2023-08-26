import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { startLogout } from "../../store/auth/thunks";
import { navigateToMenu, setUserFound, setUsers } from "../../store/thingstobuy";

export const Navbar = () => {
  const { displayName } = useSelector((status) => status.auth);
  const { invitations } = useSelector((state) => state.thingsToBuySlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLogout = () => {
    dispatch(startLogout());
    dispatch(setUsers([]));
  };

  const onBrandClick = () => {
    dispatch(navigateToMenu());
    dispatch(setUserFound(true));
    dispatch(setUsers([]));
  };

  const onInvitationsClick = () => {
    console.log("Ver invitaciones")
    navigate("/groups/invitations-list")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid ms-4 me-3">
        <Link to={`/groups`} className="navbar-brand" onClick={onBrandClick}>
          <i className="fas fa-user"></i>
          &nbsp; {displayName}
        </Link>

        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary position-relative" onClick={onInvitationsClick} >
              Invitaciones
              {invitations.length > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {invitations.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              ) : (
                ""
              )}
            </button>
          </div>
          <div className="col">
            <button className="btn btn-outline-light" onClick={handleOnLogout}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
