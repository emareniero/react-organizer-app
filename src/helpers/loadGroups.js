import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadGroups = async (uid = "" ) => {
  if (!uid) throw new Error("El uid no existe.");

  const collectionRef = collection(FirebaseDB, `${uid}/things-to-buy/groups`);
  const docs = await getDocs(collectionRef);
  //   console.log(docs)
  const groups = []
  docs.forEach((doc) => {
    groups.push({
        id: doc.id,
        ...doc.data()
    })
  });

  // console.log(groups)
  return groups;
};
