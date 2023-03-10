import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseAuth, FirebaseDB } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const resp = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = resp.user;

    await setDoc(doc(FirebaseDB, "users", uid ), {
      uid,
      displayName,
      email,
    })

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser, {
      displayName,
    });

    await setDoc(doc(FirebaseDB, "users", uid ), {
      uid,
      displayName,
      email,
    })

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorMessage = error.message;

    // Valdiación de errores
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
} 


