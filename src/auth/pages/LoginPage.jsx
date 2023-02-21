import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { startGoogleSignin, startSignInWithemailAndPassword } from "../../store/auth/thunks";
import "./LoginPage.css";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    dispatch(startSignInWithemailAndPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    // console.log("On GoogleSignIn");
    dispatch(startGoogleSignin());
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="login-form-1">
        <h3>Ingreso</h3>

        <form onSubmit={handleOnSubmit}>
          <div className="col-sm-12 mt-2 mb-2">
            <input type="text" className="form-control" placeholder="Correo" name="email" value={email} onChange={onInputChange} />
          </div>

          <div className="col-sm-12 mt-2 mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>

          <div className="d-grid gap-2">
            
            <input
              type="submit"
              className={`btn btn-primary ${!!errorMessage ? "is-invalid" : ""}`}
              value="Login"
              disabled={isCheckingAuthentication}
            />
            <input
              type="button"
              className="btn btn-danger"
              value="Login with Google"
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            />
            <div className="invalid-feedback">{errorMessage}</div>
          </div>

          <Link to="/auth/register">Registrarse</Link>
        </form>
      </div>
    </div>
  );
};
