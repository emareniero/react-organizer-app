import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
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

  // console.log({ groups });

  const findGroupsInvolved = collection(FirebaseDB, `users/${uid}/groupsInvolved`);
  const docFindGroupsInvolved = await getDocs(findGroupsInvolved);

  const arrayOfGroupsInvolved = [];
  docFindGroupsInvolved.forEach((doc) => {
    arrayOfGroupsInvolved.push({
      ...doc.data(),
    });
  });


  
  for ( const { activeGroupId, adminId } of arrayOfGroupsInvolved ) {

    const docRef = doc(FirebaseDB, `admins/${adminId}/groups/${activeGroupId}`)
    const docSnap = await getDoc(docRef)
    groups.push(docSnap.data())

  }

  console.log(groups)
  return groups;
};

// export const loadOtherGroups = async (uid = " ") => {

//   const findGroupsInvolved = collection(FirebaseDB, `users/${uid}/groupsInvolved`);
//   const docFindGroupsInvolved = await getDocs(findGroupsInvolved);

//   const arrayOfGroupsInvolved = [];
//   docFindGroupsInvolved.forEach((doc) => {
//     arrayOfGroupsInvolved.push({
//       ...doc.data(),
//     });
//   });


  
//   for ( const { activeGroupId, adminId } of arrayOfGroupsInvolved ) {

//     const docRef = doc(FirebaseDB, `admins/${adminId}/groups/${activeGroupId}`)
//     const docSnap = await getDoc(docRef)
//     groups.push(docSnap.data())

//   }

//   return groups;
// };
