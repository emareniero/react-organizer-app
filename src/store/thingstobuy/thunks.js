import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadGroups, loadItems, searchUser } from "../../helpers";
import {
  addNewEmptyGroup,
  addNewEmptyItem,
  deleteGroupById,
  deleteItemById,
  savingNewGroup,
  savingNewItem,
  setGroups,
  setItems,
  setUserFound,
  setUsers,
} from "./";

export const startNewGroup = (title = "", note = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewGroup());

    const { uid } = getState().auth;

    const newGroup = {
      title,
      note,
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/admin/groups`));
    await setDoc(newDoc, newGroup);

    newGroup.id = newDoc.id;

    dispatch(addNewEmptyGroup(newGroup));
  };
};

export const startLoadingGroups = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid no existe.");

    const groups = await loadGroups(uid);

    dispatch(setGroups(groups));
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

export const startNewItem = (gid = "", text = "", user = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewItem());

    const { uid } = getState().auth;

    const newItem = {
      text,
      user,
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/admin/groups/${gid}/items`));
    await setDoc(newDoc, newItem);

    newItem.id = newDoc.id;

    dispatch(addNewEmptyItem(newItem));
  };
};

export const startDeletingGroup = (gid) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `${uid}/admin/groups/${gid}`);
    await deleteDoc(docRef);

    dispatch(deleteGroupById(gid));
  };
};

export const startDeletingItem = (iid = " ") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeGroup } = getState().thingsToBuySlice;

    const docRef = doc(FirebaseDB, `${uid}/admin/groups/${activeGroup}/items/${iid}`);
    await deleteDoc(docRef);

    dispatch(deleteItemById(iid));
  };
};
