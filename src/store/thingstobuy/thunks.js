import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { cloneElement } from "react";
import { FirebaseDB } from "../../firebase/config";
import { loadGroups, loadItems, searchUser, setItemDone, setItemUndone } from "../../helpers";
import {
  addNewEmptyGroup,
  addNewEmptyItem,
  deleteGroupById,
  deleteItemById,
  savingNewGroup,
  savingNewItem,
  setGroups,
  setItemChecked,
  setItems,
  setItemUnchecked,
  setUpdatingItem,
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

    const groups = await loadGroups(uid);

    dispatch(setGroups(groups));
  };
};

// export const startLoadingOtherGroups = () => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     // console.log(algo)
//     if (!uid) throw new Error("El uid no existe.");

//     const groups = await loadOtherGroups(uid);

//     // dispatch(setGroups(groups));
//   }
// }

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

export const startInvitingUser = ( aid = "", activeGroupId = "", email = "", uid = "") => {
  return async (dispatch) => {

    const newInvitation = {
      adminId: aid,
      activeGroupId,
      state: true
    }

    const newInvitationDoc =  doc(collection(FirebaseDB, `users/${uid}/groupsInvolved`))
    await setDoc(newInvitationDoc, newInvitation)

    

    // console.log({
    //   aid,
    //   activeGroupId,
    //   email,
    //   uid,
    // });
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

    const { uid } = getState().auth;
    const { activeGroupId } = getState().thingsToBuySlice;

    // const itemToFirestore = { ...updatingItem }
    // delete itemToFirestore.id;
    await setItemDone(uid, activeGroupId, iid);
    const items = await loadItems(uid, activeGroupId);
    dispatch(setItems(items));
  };
};

export const startSettingItemUndone = (iid = "") => {
  return async (dispatch, getState) => {
    dispatch(setUpdatingItem(iid));
    const { uid } = getState().auth;
    const { activeGroupId } = getState().thingsToBuySlice;

    await setItemUndone(uid, activeGroupId, iid);
    const items = await loadItems(uid, activeGroupId);
    dispatch(setItems(items));
  };
};
