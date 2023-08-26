import React from "react";
import { useDispatch } from "react-redux";
import { cancelDeleting, startDeletingGroup } from "../../store/thingstobuy";

export const GroupDeleting = ({id}) => {

  const dispatch = useDispatch()

  const onNoDeletingClick = () => {
    dispatch(cancelDeleting());
  };

  const onYesDeletingClick = () => {
    dispatch(startDeletingGroup(id));
  };
  return (
    <div className="alert alert-danger mt-2 mb-0" role="alert">
      <h2 className="alert-heading">¡Estas por eliminar un grupo!</h2>
      <p className="mb-0">Ten en cuenta que si eliminas el grupo, todo el contenido del mismo se perdera y no podra ser recuperado.</p>
      <strong>¿Estas segur@ que deseas eliminar el grupo de manera definitiva?</strong>
      <hr />
      <div className="col d-flex justify-content-center">
          <button type="button" className="btn btn-danger" data-dismiss="alert" aria-label="Close" onClick={onNoDeletingClick}>
            No, no quiero.
          </button>
          <button type="button" className="btn btn-danger ms-2" data-dismiss="alert" aria-label="Close" onClick={onYesDeletingClick}>
            Si, quiero eliminar.
          </button>
        </div>
    </div>
  );
};
