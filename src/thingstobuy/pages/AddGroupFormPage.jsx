import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { startNewGroup } from "../../store/thingstobuy";

const formData = {
  title: "",
  note: "",
};

export const AddGroupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, note, onInputChange, isFormValid } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    const titleUpperCase = title.toUpperCase();
        
    dispatch(startNewGroup(titleUpperCase, note));

    navigate("/groups");
  };

  return (
    <>
      <div className="p-4">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" className="form-control" name="title" value={title} onChange={onInputChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Nota</label>
            <input className="form-control" id="note" name="note" value={note} onChange={onInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
