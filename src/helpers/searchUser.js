import { collection, doc, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const searchUser = async (email) => {
  const collectionRef = collection(FirebaseDB, "users");
  const q = query(collectionRef, where("email", "==", email));
  const docs = await getDocs(q);

  const users = [];
  docs.forEach((doc) => {
    users.push({
      ...doc.data(),
    });
  });

  return users;   
};
