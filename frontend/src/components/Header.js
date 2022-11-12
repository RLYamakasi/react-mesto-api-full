import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="header">
      <img src={logo} alt="Логотоип 'mesto' " className="header__logo" />
      <div className="header__account-side">
        <p className="header__email">{props.email}</p>
        <a
          className={
            props.login ? `header__exit header__exit_un-hiden` : `header__exit`
          }
          onClick={props.onExit}
        >
          Выйти
        </a>
        <Link
          to={props.link}
          className={
            props.login
              ? `register__content register__content_hiden`
              : `register__content `
          }
        >
          {props.linkStat}
        </Link>
      </div>
    </header>
  );
};

export default Header;
