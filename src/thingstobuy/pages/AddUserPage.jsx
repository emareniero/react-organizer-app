import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { startSearchingUser } from "../../store/thingstobuy";
import { NonExistingUser } from "../components/NonExistingUser";
import { UserCard } from "../components/UserCard";

const formData = {
  email: "",
};

export const AddUserPage = () => {
  const { user = [], userFound } = useSelector((state) => state.thingsToBuySlice);

  const dispatch = useDispatch();

  const { email, onInputChange, isFormValid } = useForm(formData);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch(startSearchingUser(email));
  };

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label className="form-label">Buscar usuario por email</label>
            <input type="email" className="form-control" name="email" value={email} onChange={onInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>
      </div>

      {userFound ? (
        <ul className="group-list me-4">
          {user.map((user) => (
            <UserCard key={user.uid} {...user} />
          ))}
        </ul>
      ) : (
        <NonExistingUser />
      )}
    </>
  );
};
