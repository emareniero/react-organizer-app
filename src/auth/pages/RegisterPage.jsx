import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";
import "./LoginPage.css";

const formData = {
  email: "",
  password: "",
  password2: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@" && ".com"), "El correo debe de tener un arroba."],
  password: [(value) => value.length >= 6, "La constraseña debe tener al menos 6 caracteres."],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [difPassword, setDifPassword] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const {
    formState,
    displayName,
    email,
    password,
    password2,
    isFormValid,
    emailValid,
    passwordValid,
    onInputChange,
  } = useForm(formData, formValidations);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    if (password !== password2) {
      return setDifPassword(true);
    }

    setDifPassword(false);

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="login-form-1">
        <h3>Registro</h3>

        <form onSubmit={handleOnSubmit}>
          <div className="col-sm-12 mt-2 mb-2">
            <input
              type="text"
              className={`form-control ${!displayName && formSubmitted ? "is-invalid" : ""} `}
              placeholder="Nombre"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
            />
            <div className="invalid-feedback">Debe ingresar su nombre.</div>
          </div>

          <div className="col-sm-12 mt-2 mb-2">
            <input
              type="email"
              className={`form-control ${!!emailValid && formSubmitted ? "is-invalid" : ""} `}
              placeholder="Correo"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <div className="invalid-feedback">Debe ingresar un correo válido.</div>
          </div>

          <div className="col-sm-12 mt-2 mb-2">
            <input
              type="password"
              className={`form-control ${!!passwordValid && formSubmitted ? "is-invalid" : ""} `}
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            <div className="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>
          </div>

          <div className="col-sm-12 mt-2 mb-2">
            <input
              type="password"
              className={`form-control ${difPassword ? "is-invalid" : ""} `}
              placeholder="Repita la contraseña"
              name="password2"
              value={password2}
              onChange={onInputChange}
            />
            <div className="invalid-feedback">Las contraseñas no coinciden.</div>
          </div>

          <div className="d-grid gap-2">
            <input
              type="submit"
              className={`btn btn-primary ${!!errorMessage ? "is-invalid" : ""}`}
              value="Crear cuenta"
              disabled={isCheckingAuthentication}
            />
            <div className="invalid-feedback">El usuario ya se encuentra registrado</div>
          </div>

          <Link to="login">Iniciar sesión</Link>
        </form>
      </div>
    </div>
  );
};
