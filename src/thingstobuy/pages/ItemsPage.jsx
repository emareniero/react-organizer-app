import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EmptyPage } from "../../ui/components/EmptyPage";
import { ItemCard } from "../components/ItemCard";
import { ItemDeleting } from "../components/ItemDeleting";

export const ItemsPage = () => {
  const navigate = useNavigate();

  const { items, activeItem } = useSelector((state) => state.thingsToBuySlice);

  const onAddClick = () => {
    navigate("/groups/add-new-item");
  };

  return (
    <>
      {items.length === 0 && <EmptyPage /> }
      <ul className="list-group mx-4">
        {items.map((item) => (activeItem !== item.id ? <ItemCard key={item.id} {...item} /> : <ItemDeleting key={item.id} {...item} />))}
      </ul>

      <div className="dropup position-fixed bottom-0 end-0 rounded-circle m-5">
        <button className="btn btn-primary btn-lg" onClick={onAddClick}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
};
