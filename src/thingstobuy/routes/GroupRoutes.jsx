import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar, GroupsPage} from "..";
import { AddGroupForm, AddItemForm, ItemsPage } from "../pages";
import { AddUserPage } from "../pages/AddUserPage";
import { InvitationsPage } from "../pages/InvitationsPage";
import { ParticipantsPage } from "../pages/ParticipantsPage";


export const GroupRoutes = () => {
  return (
    <>
      <Navbar />

        <Routes>
          {/* Rutas de groups */}
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/groups/:id/items" element={<ItemsPage/>} />
          <Route path="/groups/:id/participants" element={ <ParticipantsPage />} />
          <Route path="/groups/:id/users/add-new-user" element={ <AddUserPage /> } />
          <Route path="/groups/invitations-list" element={ <InvitationsPage /> } />
          <Route path="/groups/add-new-group" element={<AddGroupForm />} />
          <Route path="/groups/add-new-item" element={<AddItemForm />} />

          {/* Rutas de usuarios */}

          <Route path="/*" element={<Navigate to="/groups" />} />
        </Routes>
    </>
  );
};
