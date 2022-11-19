import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = useState("");

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  React.useEffect(() => {
    setAvatar("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="updateAvatar"
      id="Update"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={"сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          type="url"
          className="form__profile"
          id="url"
          placeholder="Ссылка на картинку"
          required
          value={avatar}
          onChange={handleChangeAvatar}
        />
        <span id="url-error" className="form__error">
          скрытый текст
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
