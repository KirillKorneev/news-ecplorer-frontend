import React from 'react';
import { Popup } from '../Popup/Popup.js';
import './PopupSuccess.css';

function PopupSuccess(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.login('Ну как бы не настроено еще', ':С');
    }

    return (
        <Popup 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
        >
            <form className="form">
                <h2 className="form__title">Пользователь успешно зарегистрирован!</h2>
                <h2 onClick={handleSubmit} className="form__tagger">Войти</h2>
            </form>  
        </Popup>
    );
}

export { PopupSuccess };