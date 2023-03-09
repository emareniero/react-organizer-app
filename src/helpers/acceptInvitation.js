import { doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const acceptInvitation = async (uid = "", gid = "") => {

  const docToUpdate = doc( FirebaseDB, `users/${uid}/groupsInvolved/${gid}`)

  await updateDoc(docToUpdate, {
    invitationAcepted: true,
  });

};
