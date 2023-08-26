import { useDispatch } from "react-redux";
import { startAceptingInvitation, startDenyingInvitation } from "../../store/thingstobuy";

export const InvitationItem = ({ title, note, adminEmail, id }) => {

  const dispatch = useDispatch()

  const handleOnAcceptClick = () => {
    dispatch(startAceptingInvitation(id))
  };

  const handleOnDenyClick = () => {
    dispatch(startDenyingInvitation(id))
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5 className="card-title">{note}</h5>
            <p className="card-text">
              Te han invitado al grupo {title} de {adminEmail}{" "}
            </p>
          </div>
          <div className="col d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleOnAcceptClick}>
              Aceptar
            </button>
            <button className="btn btn-primary ms-2" onClick={handleOnDenyClick}>
              Denegar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
