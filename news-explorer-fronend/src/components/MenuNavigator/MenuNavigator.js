import React from 'react';
import './MenuNavigator.css';
import { Link } from 'react-router-dom';

function MenuNavigator(props) {

    function handleLogin() {
        if (!props.isLogin) {
            props.popupLoginOpen();
        }
        else {
            props.unLogin();
        }
    }

    return (
        <>
            <div className={`overlay ${props.isOpen ? `overlay_open` : ``}`}>
            </div>
            <div className={`menu ${props.isOpen ? `menu_open` : ``}`}>
                <div className='menu__header'>
                    <h2 className='menu__logo'>NewsExplorer</h2>
                    <button className='menu__close' onClick={props.onClose}></button>
                </div>
                <nav className='menu__nav'>
                    <Link to="/" className='menu__href'>Главная</Link>
                    {
                        props.isLogin ? 
                        <Link to="/saved-news" className="menu__href">Сохраненные статьи</Link> : ''
                    }
                    <button className='menu__button' onClick={handleLogin}>
                        {
                            props.isLogin ? 'Выйти' : 'Авторизация'
                        }
                    </button>
                </nav>
            </div>
        </>
        
    );
}

export { MenuNavigator };