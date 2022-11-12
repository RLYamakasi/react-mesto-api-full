import CloseButton from "../images/Close-Icon.svg";
import regOk from "../images/reg-ok.svg";

function PopupOkey(props) {
  return (
    <div
      className={
        props.isOpen
          ? `pop-up popup_type_${props.name} pop-up_un-hiden`
          : `pop-up popup_type_${props.name}`
      }
      id={`pop${props.id}`}
    >
      <div className="form">
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
          src={regOk}
          alt="Вы успешно зарегистрировались!"
          className="pop-up__status-img"
        />
        <p className="pop-up__status-text">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default PopupOkey;
