import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveGroup, startDeletingGroup, startLoadingItems } from "../../store/thingstobuy";

export const GroupCard = ({ id, title, note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onGroupClick = () => {
    dispatch(startLoadingItems(id));
    dispatch(setActiveGroup(id));
    navigate(`/groups/${id}`);
  };

  const onDeleteClick = () => {
    dispatch(startDeletingGroup(id));
  };

  return (
    <>
      <div className="container">
        <ul className="list-group">
          <li className="list-group-item mt-2" data-id={id}>
            <div className="row">
              <div className="col">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{note}</p>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary" onClick={onGroupClick}>
                      Ver lista
                    </button>
                    <button className="btn btn-primary ms-2" onClick={onGroupClick}>
                      Participantes
                    </button>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-end">
                <button className="btn btn-danger" onClick={onDeleteClick}>
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
