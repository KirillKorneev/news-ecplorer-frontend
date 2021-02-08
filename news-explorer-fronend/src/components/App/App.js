import React from 'react';
import './App.css';
import { Head } from '../Head/Head.js';
import { PopupLogin } from '../PopupLogin/PopupLogin.js';
import { PopupRegister } from '../PopupRegister/PopupRegister.js';
import { PopupSuccess } from '../PopupSuccess/PopupSuccess.js';
import { MenuNavigator } from '../MenuNavigator/MenuNavigator.js';
import { Result } from '../Result/Result.js';
import { About } from '../About/About.js';
import { Footer } from '../Footer/Footer.js';
import { CurrentUserContext } from '../../context/currentUserContext.js';
import { Preloader } from '../Preloader/Preloader.js';
import { NotFound } from '../NotFound/NotFound.js';
import { SavedCards } from '../SavedCards/SavedCards.js';
import { Switch, Route } from 'react-router-dom';
import cards from '../../data/data.js';

function App() {

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [numberOfCards, setNumberOfCards] = React.useState(3);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Кирилл',
    email: 'email@email.ru'
  });

  React.useEffect(()=>{
    document.addEventListener('keydown', (e) => {
      if (e.key==="Escape") {
        closeAllPopups()
      }
    })
      return()=> document.removeEventListener('keydown', (e) => {
        if (e.key==="Escape") {
          closeAllPopups()
        }
      })
  }, [])

  function changeNumberOfCards() {
    if((numberOfCards+3) > cards.length) {
      setNumberOfCards(cards.length)
    }
    else {
      setNumberOfCards(numberOfCards + 3);
    }
  }

  function searchNews(text) {
    if (text === "Поиск") {
      setIsSearching(true);
      setIsResult(false);
      setIsNotFound(false);
    }
    else if (text === "Ничего") {
      setIsSearching(false);
      setIsResult(false);
      setIsNotFound(true);
    }
    else {
      setNumberOfCards(3);
      setIsSearching(false);
      setIsResult(true);
      setIsNotFound(false);
    }
  }

  function popupLoginOpen() {
    setIsMenuOpen(false);
    setIsLoginPopupOpen(true);
  }

  function popupRegistrationOpen() {
    setIsMenuOpen(false);
    setIsRegisterPopupOpen(true);
  }

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function closeAllPopups() {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsMenuOpen(false);
  }

  function register(email, name, password) {
    console.log('Вы зарегистрировались: 1)' + email + ', 2)' + password + ', 3)' + name);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function login(email, password) {
    console.log('Вы вошли на сайт: 1)' + email + ', 2)' + password);
    setIsLogin(true);
    setIsLoginPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  function unLogin() {
    console.log('Вы вышли с сайта');
    setIsLogin(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value = {
        currentUser
      }>
        <Head
          isLogin = {isLogin}
          popupLoginOpen = {popupLoginOpen}
          searchNews = {searchNews}
          unLogin = {unLogin}
          menuOpen = {handleMenuOpen}
        />
        <Switch>
          <Route path="/saved-news">
            <SavedCards 
              cards={cards}
              isLogin={isLogin}
            />
          </Route>
          <Route path="/">
            <main className="main">
              {
                isSearching ? <Preloader /> : ''
              }
              {
                isResult ? 
                <Result 
                  cards = {cards}
                  count = {numberOfCards}
                  isLogin = {isLogin}
                  changeNumberOfCards = {changeNumberOfCards}
                /> : ''
              }
              {
                isNotFound ? <NotFound /> : '' 
              }
              <About />
            </main>
          </Route>
            </Switch>
            <Footer />
        <MenuNavigator
          popupLoginOpen = {popupLoginOpen}
          isLogin = {isLogin}
          login = {login}
          unLogin = {unLogin} 
          isOpen = {isMenuOpen}
          onClose = {closeAllPopups}
        />
        <PopupLogin 
          isOpen = {isLoginPopupOpen}
          onClose = {closeAllPopups}
          login = {login}
          popupRegistrationOpen = {popupRegistrationOpen}
        />
        <PopupRegister
          isOpen = {isRegisterPopupOpen}
          onClose = {closeAllPopups}
          register = {register}
          popupLoginOpen = {popupLoginOpen}
        />
        <PopupSuccess
          isOpen = {isSuccessPopupOpen}
          onClose = {closeAllPopups}
          login = {login}
        />
      </CurrentUserContext.Provider>
    </>
  );
  
}

export default App;
