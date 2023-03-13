import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { cloneElement } from "react";
import { FirebaseDB } from "../../firebase/config";
import { loadGroups, loadItems, searchUser, setItemDone, setItemUndone } from "../../helpers";
import { acceptInvitation } from "../../helpers/acceptInvitation";
import {
  addNewEmptyGroup,
  addNewEmptyItem,
  deleteGroupById,
  deleteItemById,
  savingNewGroup,
  savingNewItem,
  setGroups,
  setInvitations,
  setItemChecked,
  setItems,
  setItemUnchecked,
  setUpdatingItem,
  setUserFound,
  setUsers,
} from "./";

export const startNewGroup = (title = "", note = "", email = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewGroup());

    const { uid } = getState().auth;

    const newGroup = {
      title,
      note,
      adminEmail: email,
      adminId: uid,
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `admins/${uid}/groups`));
    await setDoc(newDoc, newGroup);
    newGroup.id = newDoc.id;

    dispatch(addNewEmptyGroup(newGroup));
  };
};

export const startLoadingGroups = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid no existe.");

    const { groups, invitationsToGroups } = await loadGroups(uid);

    dispatch(setGroups(groups));
    dispatch(setInvitations(invitationsToGroups));
  };
};

export const startLoadingItems = (gid) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid no existe.");

    const items = await loadItems(uid, gid);

    dispatch(setItems(items));
  };
};

export const startSearchingUser = (email = "") => {
  return async (dispatch) => {
    const users = await searchUser(email);

    if (users.length === 0) {
      dispatch(setUsers(users));
      dispatch(setUserFound(false));
    } else {
      dispatch(setUsers(users));
      dispatch(setUserFound(true));
    }
  };
};

export const startInvitingUser = (aid, aemail, activeGroupId, uid) => {
  return async (dispatch) => {
    const newInvitation = {
      adminId: aid,
      adminEmail: aemail,
      activeGroupId,
      invitationAcepted: false,
    };

    await setDoc(doc(FirebaseDB, `users/${uid}/groupsInvolved`, activeGroupId), newInvitation);

    //TODO: avisar que la invitación fue realizada con éxito
  };
};

export const startNewItem = (gid = "", text = "", user = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewItem());

    const { uid } = getState().auth;

    const newItem = {
      text,
      user,
      date: new Date().getTime(),
      done: false,
    };

    const newDoc = doc(collection(FirebaseDB, `admins/${uid}/groups/${gid}/items`));
    await setDoc(newDoc, newItem);

    newItem.id = newDoc.id;

    dispatch(addNewEmptyItem(newItem));
  };
};

export const startDeletingGroup = (gid) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `admins/${uid}/groups/${gid}`);
    await deleteDoc(docRef);

    dispatch(deleteGroupById(gid));
  };
};

export const startDeletingItem = (iid = " ") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeGroupId } = getState().thingsToBuySlice;

    const docRef = doc(FirebaseDB, `admins/${uid}/groups/${activeGroupId}/items/${iid}`);
    await deleteDoc(docRef);

    dispatch(deleteItemById(iid));
  };
};

export const startSettingItemDone = (iid = "") => {
  return async (dispatch, getState) => {
    dispatch(setUpdatingItem(iid));

    const { activeGroupId, groupAdminId } = getState().thingsToBuySlice;

    await setItemDone(groupAdminId, activeGroupId, iid);
    const items = await loadItems(groupAdminId, activeGroupId);
    dispatch(setItems(items));
  };
};

export const startSettingItemUndone = (iid = "") => {
  return async (dispatch, getState) => {
    dispatch(setUpdatingItem(iid));
    const { activeGroupId, groupAdminId } = getState().thingsToBuySlice;

    await setItemUndone(groupAdminId, activeGroupId, iid);
    const items = await loadItems(groupAdminId, activeGroupId);
    dispatch(setItems(items));
  };
};

export const startAceptingInvitation = (gid = "") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    await acceptInvitation(uid, gid);

    const { groups, invitationsToGroups } = await loadGroups(uid);

    dispatch(setGroups(groups));
    dispatch(setInvitations(invitationsToGroups));
  };
};

export const startDenyingInvitation = (gid = "") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/groupsInvolved/${gid}`);
    await deleteDoc(docRef);
    const { groups, invitationsToGroups } = await loadGroups(uid);

    dispatch(setGroups(groups));
    dispatch(setInvitations(invitationsToGroups));
  };
};
