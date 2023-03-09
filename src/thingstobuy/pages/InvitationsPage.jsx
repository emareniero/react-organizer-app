import React from "react";
import { useSelector } from "react-redux";
import { InvitationItem } from "../components/InvitationItem";

export const InvitationsPage = () => {
  const { invitations } = useSelector((state) => state.thingsToBuySlice);

  return (
    <div>
      {invitations.map((invitation) => (
        <ol className="group-list me-4 mt-2">
          < InvitationItem key={invitation.id} {...invitation} />
        </ol>
      ))}
    </div>
  );
};
