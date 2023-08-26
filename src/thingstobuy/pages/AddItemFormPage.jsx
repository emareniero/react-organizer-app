import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { startNewItem } from "../../store/thingstobuy";

const formData = {
  text: "",
  user: "",
};

export const AddItemForm = () => {
  const { displayName } = useSelector((state) => state.auth);
  const { activeGroupId } = useSelector((state) => state.thingsToBuySlice);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { text, user, onInputChange, isFormValid } = useForm(formData);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch(startNewItem(activeGroupId, text, user === "" && displayName));

    navigate(`/groups/${activeGroupId}/items`);
  };

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label className="form-label">Texto</label>
            <input type="text" className="form-control" name="text" value={text} onChange={onInputChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input type="text" className="form-control" name="user" value={user} onChange={onInputChange} />
          </div>
          <button className="btn btn-primary" type="submit">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
