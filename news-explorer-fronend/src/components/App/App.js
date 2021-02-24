import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { ProtectedRoute } from '../ProtectedRouter/ProtectedRouter.js';
import { ResultError } from '../ResultError/ResultError.js';
import { Switch, Route } from 'react-router-dom';
import { newsApi } from '../../utils/NewsApi.js';
import { mainApi } from '../../utils/MainApi.js';
import { getToken, setToken, removeToken } from '../../utils/token.js';
import * as cardsStorage from '../../utils/cards.js';

function App() {

  const [cards, setCards] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [numberOfCards, setNumberOfCards] = React.useState(3);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResultError, setIsResultError] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('Юзер');
  const [keyWords, setKeyWords] = React.useState([]);
  const [error, setError] = React.useState('');
  const history = useHistory();
  const historyState = history.location.state;
  const wasRedirected = historyState && historyState.noAuthRedirect
  const keyWordInput = React.useRef(null);

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

  function getArticles() {
    mainApi.getCards(getToken())
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    const jwt = getToken();
    const cardList = JSON.parse(cardsStorage.getCards())

    if (!jwt) {
      return;
    }

    mainApi.getContent(jwt)
    .then((res) => {
      if (res) {
        const userDataIn = res.name;
        setToken(jwt);
        setIsLogin(true);
        setCurrentUser(userDataIn);
        history.push('/');
      }
      else {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLogin(false);
    });

    if (cardList != null) {
      if (cardList != '') {
        if (cardList != []) {
          setCards(cardList);
          setIsResult(true);
        }
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function isSaved(newsArticle) {
    for (let j = 0; j < articles.length; j++) {
      if(newsArticle.url === articles[j].link) {
        return true;
      }
    }
    return false;
  }

  function searchNews(keyword) {
    cardsStorage.setKeyWord(keyword);
    setIsNotFound(false);
    setIsResult(false);
    setIsSearching(true);
    getArticles();
    newsApi.getItems(keyword)
    .then((res) => {
      if (res.totalResults === 0) {
        setIsResultError(false);
        setIsNotFound(true);
        setIsResult(false);
      }
      else if (res.articles === null || res === null) {
        return null;
      }
      else {
        setIsResultError(false);
        setNumberOfCards(3);
        setIsResult(true);
        setIsNotFound(false);
        cardsStorage.setCards(JSON.stringify(res.articles));
        setCards(JSON.parse(cardsStorage.getCards()));
      }
    })
    .catch((err) => {
      setIsResultError(true);
      console.log(`Ошибка ${err}`)
    })
    .finally(() => {
      setIsSearching(false);
    });
  }

  function isContainSameElements(array, word) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === word) {
        return true;
      }
    }
    return false;
  }

  function keyWordsArray() {
    mainApi.getCards(getToken())
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => console.log(err));
    const words = [];
    for (let i = 0; i < articles.length; i++) {
      if (!isContainSameElements(words, articles[i].keyword)) {
        words.push(articles[i].keyword);
      }
    }
    setKeyWords(words);
  }

  React.useEffect(()=>{
    setError('');
    getArticles();
    keyWordsArray();
  }, [])

  const deleteArticle = (card) => {
    mainApi.deleteCard(card)
    .then(() => {
      const newCards = articles.filter((c) => c._id !== card);
      setArticles(newCards);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  function saveCard(cardInfo) {
    const keyWord = cardsStorage.getkeyWord();
    let word = keyWordInput;

    if (keyWord != null) {
      if (keyWord != '') {
        if (keyWord != undefined) {
          word = keyWord;
        }
      }
    }

    mainApi.saveNewsCard(cardInfo, word, getToken())
      .then((res) => {
        setArticles([...articles, res.data]);
        keyWordsArray();
      })
      .catch((err) => console.log(err));
  }

  function changeNumberOfCards() {
    if((numberOfCards+3) > cards.length) {
      setNumberOfCards(cards.length)
    }
    else {
      setNumberOfCards(numberOfCards + 3);
    }
  }

  function redirectLogin() {
    setIsSuccessPopupOpen(false);
    setIsLoginPopupOpen(true);
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
    setError('');
  }

  function handleLogin(userDataIn) {
    setCurrentUser(userDataIn);
    setIsLogin(true);
  }

  function register(email, name, password) {
    mainApi.register(email, name, password)
      .then((res) => {
        if (!res.message) {
          setIsRegisterPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }
        else {
          setError(res.message);
          setIsLogin(false);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function login(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (!res.message) {
          setToken(res.token);
          handleLogin(res);
          mainApi.getContent(getToken())
          .then((res) => {
            if (res) {
              setCurrentUser(res.name);
            }
            else {
              return;
            }
          })
          .catch((err) => {
            console.log(err);
          });
          closeAllPopups();
        }
        else {
          setError(res.message);
          return;
        }
      })
      .catch((err) => {
        setIsLogin(false);
        console.log(err)
      });
    
  }

  function unLogin() {
    setIsLogin(false);
    removeToken();
    cardsStorage.removekeyWord();
    cardsStorage.removeCards();
    setIsResult(false);
    history.push('/');
  }

  React.useEffect(() => {
    if (wasRedirected) {
      setIsLoginPopupOpen(true);
      history.replace('/');
    }
  });

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
          keyWordInput = {keyWordInput}
          keyWords = {keyWords}
          keyWordsArray = {keyWordsArray}
          articles = {articles}
        />
        <Switch>
          <ProtectedRoute
            path = "/saved-news"
            isLogin = {isLogin}
            component = {SavedCards}
            setArticles = {setArticles}
            articles = {articles}
            deleteArticle = {deleteArticle}
            setIsResult = {setIsResult}
          />
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
                  saveCard = {saveCard}
                  isSaved = {isSaved}
                /> : ''
              }
              {
                isNotFound ? <NotFound /> : '' 
              }
              {
                isResultError ? <ResultError /> : ''
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
          error = {error}
        />
        <PopupRegister
          isOpen = {isRegisterPopupOpen}
          onClose = {closeAllPopups}
          register = {register}
          popupLoginOpen = {popupLoginOpen}
          error = {error}
        />
        <PopupSuccess
          isOpen = {isSuccessPopupOpen}
          onClose = {closeAllPopups}
          login = {redirectLogin}
        />
      </CurrentUserContext.Provider>
    </>
  );
  
}

export default App;
