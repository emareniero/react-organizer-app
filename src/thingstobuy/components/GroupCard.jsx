import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletingGroup, setActiveGroup, startLoadingItems } from "../../store/thingstobuy";

export const GroupCard = ({ id, title, note, email, displayName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onGroupClick = () => {
    dispatch(startLoadingItems(id));
    dispatch(setActiveGroup(id));
    navigate(`/groups/${id}/items`);
  };

  const onParticipantsClick = () => {
    navigate(`/groups/${id}/participants`);
    // navigate(`/groups/${id}/users`)
  };

  const onAddUserClick = () => {
    dispatch(setActiveGroup(id))
    navigate(`/groups/${id}/users/add-new-user`);
  };

  const onDeleteClick = () => {
    // dispatch(setActiveGroup(id));
    dispatch(deletingGroup(id))
  };

  return (
    <>
      <div className="card mt-2">
        <div className="card-body">
          <h5 className="card-title">{title || displayName}</h5>
          <p className="card-text">{note || email}</p>
          <div className="row">
            <div className="col-9">
              <button className="btn btn-primary" onClick={onGroupClick}>
                Ver lista
              </button>
              <button className="btn btn-primary ms-2" onClick={onAddUserClick}>
                Agregar integrante
              </button>
              <button className="btn btn-primary ms-2" onClick={onParticipantsClick}>
                Integrantes
              </button>
            </div>

            <div className="col d-flex justify-content-end">
              <button className="btn btn-danger" onClick={onDeleteClick}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
