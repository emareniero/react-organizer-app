import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar, GroupsPage} from "..";
import { AddGroupForm, AddItemForm, ItemCard } from "../pages";


export const GroupRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/groups/:id" element={<ItemCard />} />
          <Route path="/groups/add-new-group" element={<AddGroupForm />} />
          <Route path="/groups/add-new-item" element={<AddItemForm />} />

          <Route path="/*" element={<Navigate to="/groups" />} />
        </Routes>
      </div>
    </>
  );
};
