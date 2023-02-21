import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { startNewItem } from "../../store/thingstobuy";

const formData = {
  text: "",
};

export const AddItemForm = () => {
  const { activeGroup } = useSelector((state) => state.thingsToBuySlice);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { text, onInputChange, isFormValid } = useForm(formData);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch(startNewItem(activeGroup, text));

    navigate(`/groups/${activeGroup}`);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label className="form-label">Texto</label>
          <input type="text" className="form-control" name="text" value={text} onChange={onInputChange} />
        </div>
        <button className="btn btn-primary" type="submit">
          Crear
        </button>
      </form>
    </>
  );
};
