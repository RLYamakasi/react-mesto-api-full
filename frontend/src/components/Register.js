import React from "react";
import { Link, withRouter } from "react-router-dom";
import PopupOkey from "./PopupOkey.js";
import PopupBad from "./PopupBad.js";
import { api } from "../utils/Api.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isPopupOkeyOpen: false,
      isPopupBadOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setLinkStatus("Войти");
    this.props.setLink("sign-in");
  }

  closeAllPopups = () => {
    this.setState({ isPopupOkeyOpen: false });
    this.setState({ isPopupBadOpen: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    api
      .register(this.state.password, this.state.email)
      .then((res) => {
        console.log(res);
        if (res) {
          this.setState({ isPopupOkeyOpen: true });
          setTimeout(() => this.props.history.push("/sign-in"), 3000);
        } else {
          this.setState({ isPopupBadOpen: true });
        }
      })
      .catch((err) => {
        console.log(` ${err}`);
        this.setState({ isPopupBadOpen: true });
      });
  };
  render() {
    return (
      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form
          className="form__field"
          // id="edit"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <label className="form__label form__label_register">
            <input
              name="email"
              type="text"
              className="form__profile"
              id="email"
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
              id="password"
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
            onSubmit={this.handleSubmit}
          >
            Зарегистрироваться
          </button>
        </form>
        <Link to="sign-in" className="register__content">
          Уже зарегистрированы? Войти
        </Link>
        <PopupOkey
          isOpen={this.state.isPopupOkeyOpen}
          onClose={this.closeAllPopups}
        />
        <PopupBad
          isOpen={this.state.isPopupBadOpen}
          onClose={this.closeAllPopups}
        />
      </div>
    );
  }
}

export default withRouter(Register);
