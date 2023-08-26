import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EmptyPage } from "../../ui/components/EmptyPage";
import { GroupCard } from "../components/GroupCard";
import { GroupDeleting } from "../components/GroupDeleting";

export const GroupsPage = () => {
  const navigate = useNavigate();

  const { groups, activeGroupId, isDeleting } = useSelector((state) => state.thingsToBuySlice);

  const onAddClick = () => {
    navigate("/groups/add-new-group");
  };

  return (
    <>
      {groups.length === 0 && <EmptyPage />}
      <ol className="group-list me-4">
        {groups.map((group) => (activeGroupId === group.id && isDeleting === true ? <GroupDeleting key={group.id} {...group} /> : <GroupCard key={group.id} {...group} />)
        )}
      </ol>

      <div className="dropup position-fixed bottom-0 end-0 rounded-circle m-5">
        <button className="btn btn-primary btn-lg" onClick={onAddClick}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
};
