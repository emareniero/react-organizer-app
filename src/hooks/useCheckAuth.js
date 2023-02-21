import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingGroups } from "../store/thingstobuy";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // Esto viene de Firebase y me ayuda a saber si cambio el estado en el backend
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // console.log( user )
      if (!user) return dispatch(logout());

      const { uid, displayName, photoURL, email } = user;

      dispatch(login({ uid, displayName, photoURL, email }));
      dispatch( startLoadingGroups() )
    });
  }, []);
  return {status};
};
