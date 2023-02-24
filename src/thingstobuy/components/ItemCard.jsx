import { useDispatch } from "react-redux";
import { setActiveItem } from "../../store/thingstobuy";

export const ItemCard = ({ id, text, user }) => {
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(setActiveItem(id));
  };

  const onCheckClick = () => {
    
  }

  return (
    <>
      <div className="card mt-2">
        <div className="card-body">
          <div className="row">
            <input className="col-1 d-flex justify-content-start" type="checkbox" onClick={onCheckClick}/>
            <div className="col d-flex justify-content-start">{text}</div>
            <div className="col d-flex justify-content-center">
              <span className="badge bg-secondary">{user}</span>
            </div>
            <div className="col d-flex justify-content-end">
              <button type="button" className="btn-close" aria-label="Close" onClick={handleOnDelete}></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
