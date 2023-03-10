import { doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const setItemUndone = async (uid = "", gid = "", iid = "") => {
  const setDocDone = doc(FirebaseDB, `admins/${uid}/groups/${gid}/items/${iid}`);

  await updateDoc(setDocDone, {
    done: false,
  });
};
