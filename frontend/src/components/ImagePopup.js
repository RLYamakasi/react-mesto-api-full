import CloseButton from "../images/Close-Icon.svg";

function ImagePopup(props) {
  return (
    <div
      onClick={props.onClose}
      className={`pop-up pop-up_type_image ${props.card && "pop-up_un-hiden"}`}
      id="popImg"
    >
      <div className="pop-up__block">
        <button
          className="pop-up__close-button"
          type="button"
          onClick={props.onClose}
        >
          <img
            src={CloseButton}
            alt="кнопка закрыть"
            className="pop-up__close-button-img"
          />
        </button>
        <img
          src={props.card}
          alt={props.cardName}
          className="pop-up__big-image"
        />
        <p className="pop-up__text">{props.cardName}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
