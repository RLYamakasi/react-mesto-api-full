import React, { useContext } from "react";
import EditButton from "../images/edit-button.svg";
import AddButton from "../images/add-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.js";

const Main = (props) => {
  const userContext = useContext(CurrentUserContext);

  return (
    <main id="main">
      <section className="profile">
        <div className="profile__avatar" onClick={props.isEditAvatarPopupOpen}>
          <img
            className="profile__avatar-img"
            src={userContext.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userContext.name}</h1>
          <p className="profile__subtitle">{userContext.about}</p>
          <button
            className="profile__button"
            type="button"
            onClick={props.onEditProfile}
          >
            <img
              src={EditButton}
              alt="кнопка редактировать"
              className="profile__buttonImg"
            />
          </button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img
            src={AddButton}
            alt="кнопка добавить"
            className="profile__add-buttonImg"
          />
        </button>
      </section>
      <Card
        onCardDelete={props.onCardDelete}
        onCardLike={props.onCardLike}
        card={props.card}
        onCardClick={props.onCardClick}
        setName={props.setName}
      />
    </main>
  );
};

export default Main;
