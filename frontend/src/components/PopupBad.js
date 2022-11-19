import CloseButton from "../images/Close-Icon.svg";
import regBad from "../images/reg-bad.svg";

function PopupBad(props) {
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
          src={regBad}
          alt="Вы успешно зарегистрировались!"
          className="pop-up__status-img"
        />
        <p className="pop-up__status-text">
          Что-то пошло не так! Попробуйте ещё раз.
        </p>
      </div>
    </div>
  );
}

export default PopupBad;
