import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFound, setUsers, startInvitingUser, userInvitation, userInvitationCancel } from "../../store/thingstobuy";

export const UserCard = ({ displayName, email, uid }) => {


  const [yes, setYes] = useState(false)

  const { uid: aid, email: aemail } = useSelector((state) => state.auth);
  const { activeGroupId, isInviting } = useSelector((state) => state.thingsToBuySlice);

  const dispatch = useDispatch();

  const handleOnClickInvitation = () => {
    
    console.log("Enviando invitación");
    dispatch(userInvitation());
  };

  const handleOnYesClick = () => {
    console.log("Yes, invitalo")
    dispatch(userInvitationCancel())
    dispatch(startInvitingUser(aid, aemail, activeGroupId, uid));
    dispatch(setUsers([]))

  }

  const handleOnNoClick = () => {
    console.log("No, no lo invito")
    dispatch(userInvitationCancel())
  }

  return (
    <>
      {isInviting ? (
        <div className="alert alert-info">
          <div className="card-body">
            <h5 className="card-title">¿Esta seguro que desea invitar a este usuario al grupo?</h5>
            <div className="row">
              <div className="col">
                <p className="card-text">El usuario recibira la invitación y si la acepta se integrará al grupo</p>
              </div>
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-info" onClick={handleOnYesClick}>
                  Si
                </button>
                <button type="button" className="btn btn-info ms-2" onClick={handleOnNoClick}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title">{displayName}</h5>
                <p className="card-text">{email}</p>
              </div>
              <div className="col d-flex justify-content-end">
                <button className="btn btn-primary" onClick={handleOnClickInvitation}>
                  Invitar al grupo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
