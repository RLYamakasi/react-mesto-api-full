import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = (props) => {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.postCard(place, link);
  }

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      id="Add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button="создать"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          type="text"
          className="form__profile"
          id="place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangePlace}
          value={place}
        />
        <span id="place-error" className="form__error">
          скрытый текст
        </span>
      </label>
      <label className="form__label">
        <input
          type="url"
          className="form__profile"
          id="source"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeLink}
          value={link}
        />
        <span id="source-error" className="form__error">
          скрытый текст
        </span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
