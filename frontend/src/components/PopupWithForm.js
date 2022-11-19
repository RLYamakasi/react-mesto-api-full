import CloseButton from "../images/Close-Icon.svg";

function PopupWithForm(props) {
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
        <h3 className="form__title">{props.title}</h3>
        <form
          className="form__field"
          id="edit"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="form__save-button"
            type="submit"
            onClick={props.onClose}
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
