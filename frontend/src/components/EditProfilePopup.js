import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="edit"
      id="Edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={"сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          onChange={handleChangeName}
          type="text"
          className="form__profile"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
        />
        <span id="name-error" className="form__error">
          скрытый текст
        </span>
      </label>
      <label className="form__label">
        <input
          onChange={handleChangeDescription}
          type="text"
          className="form__profile"
          id="job"
          placeholder="Работа"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
        />
        <span id="job-error" className="form__error">
          скрытый текст
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
