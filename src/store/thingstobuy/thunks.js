import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadGroups, loadItems } from "../../helpers";
import { addNewEmptyGroup, addNewEmptyItem, savingNewGroup, savingNewItem, setActiveGroup, setActiveItem, setGroups, setItems } from "./";

export const startNewGroup = (title = "", note = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewGroup());

    const { uid } = getState().auth;

    const newGroup = {
      title,
      note,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/things-to-buy/groups`));
    await setDoc(newDoc, newGroup);

    newGroup.id = newDoc.id;

    dispatch(addNewEmptyGroup(newGroup));
    dispatch(setActiveGroup(newGroup));
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

export const startNewItem = (gid = "", text = "") => {
  return async (dispatch, getState) => {
    dispatch(savingNewItem());

    const { uid } = getState().auth;

    const newItem = {
      text,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/things-to-buy/groups/${gid}/items`));
    await setDoc(newDoc, newItem);

    newItem.id = newDoc.id;

    dispatch(addNewEmptyItem(newItem));
    dispatch(setActiveItem(newItem));
  };
};

export const startDeletingItem = (iid = " ") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeGroup } = getState().thingsToBuySlice;

    const docRef = doc(FirebaseDB, `${uid}/things-to-buy/groups/${activeGroup}/items/${iid}`);
    await deleteDoc(docRef);
  };
};

export const startDeletingGroup = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    console.log({ id });

    const docRef = doc(FirebaseDB, `${uid}/things-to-buy/groups/${id}`);
    await deleteDoc(docRef);
  };
};
