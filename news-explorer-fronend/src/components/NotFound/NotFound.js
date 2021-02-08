import React from 'react';
import './NotFound.css';
import icon from '../../images/not-found_v1.svg';

function NotFound(props) {

    return (
        <section className="not-found">
            <img src={icon} className="not-found__icon" />
            <h2 className="not-found__title">Ничего не найдено</h2>
            <p className="not-found__text">К сожалению по вашему запросу ничего не найдено.</p>
        </section>
    );
}

export { NotFound };