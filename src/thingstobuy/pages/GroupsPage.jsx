import { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "../components/GroupCard";

export const GroupsPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const { groups } = useSelector((state) => state.thingsToBuySlice);

  const onAddClick = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
    navigate("/groups/add-new-group");
  };

  return (
    <>
      <div className="container">
        {groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
        <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
          <button className="btn btn-primary btn-lg" onClick={onAddClick}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};
