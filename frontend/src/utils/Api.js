export const BASE_URL = "https://auth.nomoreparties.co";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  changeLikeCardStatus = (id, status) => {
    if (status) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    }
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: `GET`,
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  postCards = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  };

  patchProfile = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  };

  patchAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._getResponseData(res));
  };

  getProfile = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: `GET`,
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  deleteCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "delete",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };
  register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._getResponseData(res));
  };

  login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._getResponseData(res));
  };

  getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  };
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "6976fede-faeb-4a9a-8092-6b8fce19d4dd",
    "Content-Type": "application/json",
  },
});
