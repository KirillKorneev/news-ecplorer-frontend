import React from 'react';
import './ResultError.css';

function ResultError(props) {

    return (
        <section className="error">
            <h2 className="error__title">Во время запроса произошла ошибка.</h2>
            <p className="error__text">Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        </section>
    );
}

export { ResultError };