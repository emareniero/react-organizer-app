import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { useState } from "react";
import { FirebaseDB } from "../firebase/config";

export const loadGroups = async (uid = "") => {
  if (!uid) throw new Error("El uid no existe.");

  const collectionRef = collection(FirebaseDB, `admins/${uid}/groups`);
  const docs = await getDocs(collectionRef);

  const groups = [];
  docs.forEach((doc) => {
    groups.push({
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

  const invitationsToGroups = [];

  for (const { activeGroupId, adminId, invitationAcepted } of arrayOfGroupsInvolved) {
    const docRef = doc(FirebaseDB, `admins/${adminId}/groups/${activeGroupId}`);
    const docSnap = await getDoc(docRef);

    if (!invitationAcepted === false) {
      groups.push({
        id: activeGroupId,
        ...docSnap.data(),
      });
    } else {
      invitationsToGroups.push({
        id: activeGroupId,
        ...docSnap.data(),
      });
    }
  }

  return {
    groups,
    invitationsToGroups,
  };
};
