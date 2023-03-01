import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startInvitingUser } from "../../store/thingstobuy";

export const UserCard = ({ displayName, email, uid }) => {

  const { uid: aid } = useSelector( ( state ) => state.auth )
  const { activeGroupId } = useSelector( (state) => state.thingsToBuySlice )

  const dispatch = useDispatch(); 


  const handleOnClickInvitation = () => {

    dispatch( startInvitingUser( aid, activeGroupId, email, uid ) )

  }


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
              <button className="btn btn-primary" onClick={handleOnClickInvitation}>Invitar al grupo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
