import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadItems = async (uid = "", gid = "") => {
  if (!uid) throw new Error("El uid no existe.");

  const collectionRef = collection(FirebaseDB, `${uid}/admin/groups/${gid}/items`);
  const docs = await getDocs(collectionRef);

  const items = [];
  docs.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  console.log(items);
  return items;
};
