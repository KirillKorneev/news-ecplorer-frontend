import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext.js';

function Header(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const style1 = {
        borderBottom: 'solid white 3px',
    };
    const style2 = {
        borderBottom: 'solid black 3px',
    };
    const styleForMainPage = props.isMain ? style1 : {};
    const styleForAnotherPage = props.isMain ? {} : style2;

    function handleLogin() {
        if (!props.isLogin) {
            props.popupLoginOpen();
        }
        else {
            props.unLogin();
        }
    }

    function handleOpenMenu() {
        props.menuOpen();
    }

    return (
        <header className={`header ${props.isSaved ? 'header_saved' : ''}`}>
            <div className={`header__content ${props.isSaved ? `header__content_login` : ''}`}>
                <Link to="/" className={`header__logo ${props.isSaved ? 'header__logo_login' : ''}`}>NewsExplorer</Link>
                <div className="header__info">
                    <Link to="/" className={`header__href ${props.isSaved ? 'header__href_login' : ''}`} style={styleForMainPage} >Главная</Link>
                    {
                        props.isLogin ? <Link to="/saved-news" className={`header__href ${props.isSaved ? 'header__href_login' : ''}`} style={styleForAnotherPage}>Сохранённые статьи</Link> : ''
                    }
                    <button onClick={handleLogin} className={`header__button ${props.isSaved ? 'header__button_login' : ''}`}>
                        {props.isLogin ? 
                            <div className="header__button-info">
                                <p className="header__sign">{`${currentUser}`}</p>
                                <div className={`header__mark ${props.isSaved ? '' : 'header__mark_saved'}`}></div>
                            </div> : 
                            <div className="header__button-info">
                                Авторизоваться
                            </div>
                        }
                    </button>
                    <button className={`header__button-menu ${props.isSaved ? 'header__button-menu_black' : ''}`} onClick={handleOpenMenu}></button>
                </div>
            </div>
        </header>
    );
}

export { Header };