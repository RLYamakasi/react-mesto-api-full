import React from "react";
import { withRouter } from "react-router-dom";
import { api } from "../utils/Api.js";
import PopupBad from "./PopupBad.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isPopupBadOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setLinkStatus("Регистрация");
    this.props.setLink("/sign-up");
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  closePopupBadOpen = () => {
    this.setState({ isPopupBadOpen: false });
  };
  handleSubmit(e) {
    e.preventDefault();
    api
      .login(this.state.password, this.state.email)
      .then((data) => {
        if (data) {
          this.props.setLogin(true);
          this.props.history.push("/main");
          this.props.setEmail(this.state.email);
          Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([infoResult, cardsResult]) => {
            this.props.setСurrentUser(infoResult);
            this.props.setCards(cardsResult.reverse());
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
        }
      })
      .catch((err) => {
        this.setState({ isPopupBadOpen: true });
      });
  }
  render() {
    return (
      <div className="register">
        <h1 className="register__title">Вход</h1>
        <form className="form__field" noValidate onSubmit={this.handleSubmit}>
          <label className="form__label form__label_register">
            <input
              name="email"
              type="text"
              className="form__profile"
              id="name"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
              onChange={this.handleChange}
              value={this.state.email}
            />
            <span id="name-error" className="form__error">
              скрытый текст
            </span>
          </label>
          <label className="form__label form__label_register">
            <input
              name="password"
              type="password"
              className="form__profile"
              id="job"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              required
              onChange={this.handleChange}
              value={this.state.password}
            />
            <span id="job-error" className="form__error">
              скрытый текст
            </span>
          </label>
          <button
            className="register__save-button"
            type="submit"
            onSubmit={this.handleSubmit}
          >
            Войти
          </button>
        </form>
        <PopupBad
          isOpen={this.state.isPopupBadOpen}
          onClose={this.closePopupBadOpen}
        />
      </div>
    );
  }
}

export default withRouter(Login);
