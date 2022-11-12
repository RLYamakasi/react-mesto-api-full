import { React, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardName, setCardName] = useState("");
  const [email, setEmail] = useState("");
  const [linkStatus, setLinkStatus] = useState("Войти");
  const [link, setLink] = useState("/sign-in");

  let history = useHistory();

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/main");
          }
        })
        .catch((err) => {
          console.log(`ошибка ${err}`);
        });
    }
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setEmail("");
  }

  function handleCardLike(card, context) {
    const isLiked = card.likes.some((i) => i._id === context._id);

    return api
      .changeLikeCardStatus(card._id, isLiked)
      .then((currentCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? currentCard : item))
        );
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([infoResult, cardsResult]) => {
        setСurrentUser(infoResult);
        setCards(cardsResult);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }, []);

  function handleUpdateUser(name, about) {
    api
      .patchProfile(name, about)
      .then(() => {
        setСurrentUser({
          ...currentUser,
          about,
          name,
        });
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .patchAvatar(avatar)
      .then(() => {
        setСurrentUser({
          ...currentUser,
          avatar,
        });
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handlePostCard(name, description) {
    return api
      .postCards(name, description)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleCardClick(status) {
    setSelectedCard(status);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div>
      <Header
        email={email}
        onExit={signOut}
        login={loggedIn}
        linkStat={linkStatus}
        link={link}
      />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />}
        </Route>
        <Route path="/main">
          <CurrentUserContext.Provider value={currentUser}>
            {loggedIn ? (
              <Main
                setCards={setCards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                isEditAvatarPopupOpen={handleEditAvatarClick}
                card={cards}
                onCardClick={handleCardClick}
                setName={setCardName}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ) : (
              <Redirect to="/sign-up" />
            )}

            <EditProfilePopup
              setUser={setСurrentUser}
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />
            <EditAvatarPopup
              setUser={setСurrentUser}
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            />
            <AddPlacePopup
              card={cards}
              setCards={setCards}
              postCard={handlePostCard}
              setUser={setСurrentUser}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              cardName={cardName}
            />
          </CurrentUserContext.Provider>
          <Footer />
        </Route>
        <Route path="/sign-up">
          <Register
            setLogin={setLoggedIn}
            setLinkStatus={setLinkStatus}
            setLink={setLink}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            setLogin={setLoggedIn}
            setEmail={setEmail}
            setLinkStatus={setLinkStatus}
            setLink={setLink}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
