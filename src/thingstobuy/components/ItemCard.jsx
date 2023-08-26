import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemDone, setItemUndone } from "../../helpers";
import {
  deletingItem,
  setActiveItem,
  startSettingItemDone,
  startSettingItemUndone,
} from "../../store/thingstobuy";

export const ItemCard = ({ id, text, user, done }) => {
  const [isDone, setIsDone] = useState(done);

  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(deletingItem(id));
  };

  const onCheckClick = () => {


    if (!isDone) {
      dispatch(startSettingItemDone(id));
      setIsDone(!isDone);
    } else {
      dispatch(startSettingItemUndone(id));
      setIsDone(!isDone);
    }
  };

  return (
    <>
      <div className={isDone ? "card opacity-25 mt-2" : "card mt-2"}>
        <div className="form-check form-switch">
          <div className="row p-3 ms-1">
            <input className="form-check-input col-9" type="checkbox" onChange={onCheckClick} checked={isDone} />
            <div className="col-6">
              <label className="form-check-label">{text}</label>
            </div>
            <div className="col">
              <span className="badge bg-secondary ms-2">{user}</span>
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
