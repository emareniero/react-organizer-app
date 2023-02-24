import React from "react";
import { useDispatch } from "react-redux";
import { cancelDeleting, startDeletingItem } from "../../store/thingstobuy";

export const ItemDeleting = ({ id }) => {
  const dispatch = useDispatch();

  const onNoDeletingClick = () => {
    dispatch(cancelDeleting());
  };

  const onYesDeletingClick = () => {
    dispatch(startDeletingItem(id));
  };

  return (
    <div className="alert alert-danger alert-dismissible fade show mt-2 mb-0" role="alert">
      <div className="row align-items-center">
        <div className="col">
          <strong>HEY!!</strong> ¿Estas segur@ que <strong>quieres eliminar</strong> este item?
        </div>
        <div className="col d-flex justify-content-end">
          <button type="button" className="btn btn-danger" data-dismiss="alert" aria-label="Close" onClick={onNoDeletingClick}>
            No, no quiero.
          </button>
          <button type="button" className="btn btn-danger ms-2" data-dismiss="alert" aria-label="Close" onClick={onYesDeletingClick}>
            Si, quiero eliminar.
          </button>
        </div>
      </div>
    </div>
  );
};
