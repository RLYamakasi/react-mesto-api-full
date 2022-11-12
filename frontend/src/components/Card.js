import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ onCardDelete, onCardLike, card, onCardClick, setName }) => {
  const userContext = useContext(CurrentUserContext);
  function handleClick(img, name) {
    onCardClick(img);
    setName(name);
  }

  return (
    <section className="elements">
      {card.map((obj, i) => (
        <div key={obj._id} className="element">
          <img
            src={obj.link}
            className="element__image"
            onClick={() => handleClick(obj.link, obj.name)}
          />
          <h2 className="element__text">{obj.name}</h2>
          <div className="element__like">
            <button
              onClick={() => onCardLike(obj, userContext)}
              className={
                obj.likes.some((i) => i._id === userContext._id)
                  ? `element__button  element__button_active`
                  : `element__button`
              }
              type="button"
            ></button>
            <div className="element__like-count">{obj.likes.length}</div>
          </div>
          <button
            onClick={() => onCardDelete(obj._id)}
            className={
              obj.owner._id === userContext._id
                ? `element__bin`
                : `element__bin_hiden`
            }
          ></button>
        </div>
      ))}
    </section>
  );
};

export default Card;
