import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadItems = async (uid = "", gid = "") => {
  if (!uid) throw new Error("El uid no existe.");

  const collectionRef = collection(FirebaseDB, `admins/${uid}/groups/${gid}/items`);
  const docs = await getDocs(collectionRef);

  const items = [];
  docs.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const findGroupsInvolved = collection(FirebaseDB, `users/${uid}/groupsInvolved`);
  const docFindGroupsInvolved = await getDocs(findGroupsInvolved);

  const arrayOfGroupsInvolved = [];
  docFindGroupsInvolved.forEach((doc) => {
    arrayOfGroupsInvolved.push({
      ...doc.data(),
    });
  });


  for (const { activeGroupId, adminId, invitationAcepted } of arrayOfGroupsInvolved) {
    const docRef = collection(FirebaseDB, `admins/${adminId}/groups/${activeGroupId}/items`);
    const docSnap = await getDocs(docRef);

    
    if (!invitationAcepted === false) {
      docSnap.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    }
  }


  return items
};
