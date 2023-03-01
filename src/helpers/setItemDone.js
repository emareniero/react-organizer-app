import { doc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const setItemDone = async (uid = "", gid = "", iid = "") => {
  const setDocDone = doc(FirebaseDB, `admins/${uid}/groups/${gid}/items/${iid}`);

  const updatedDoc = await updateDoc(setDocDone, {
    done: true,
  });

  console.log(updatedDoc)
};
