import React from 'react';
import { Header } from '../Header/Header.js';
import { Search } from '../Search/Search.js';
import { SavedInfo } from '../SavedInfo/SavedInfo.js';
import { Switch, Route } from 'react-router-dom';
import './Head.css';

function Head(props) {

    return (
        <Switch>
            <Route path="/saved-news">
                <section className="head head_saved">
                    <Header 
                        isLogin = {props.isLogin}
                        popupLoginOpen = {props.popupLoginOpen}
                        unLogin = {props.unLogin}
                        isSaved = {true}
                        menuOpen = {props.menuOpen}
                        isMain = {false}
                    />
                    <SavedInfo 
                        keyWords = {props.keyWords}
                        keyWordsArray = {props.keyWordsArray}
                        articles = {props.articles}
                    />
                </section>
            </Route>
            <Route path="/">
                <section className="head head__padding">
                    <Header 
                        isLogin = {props.isLogin}
                        popupLoginOpen = {props.popupLoginOpen}
                        unLogin = {props.unLogin}
                        isSaved = {false}
                        menuOpen = {props.menuOpen}
                        isMain = {true}
                    />
                    <div className="head__info">
                        <h1 className="head__title">Что творится в мире?</h1>
                        <p className="head__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                        <Search 
                            searchNews = {props.searchNews}
                            keyWordInput = {props.keyWordInput}
                        />
                    </div>
                </section>
            </Route>
                
        </Switch>


        
    );
}

export { Head };