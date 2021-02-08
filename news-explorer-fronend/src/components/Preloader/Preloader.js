import React from 'react';
import './Preloader.css';

function Preloader(props) {

    return (
        <section className="preloader">
            <div className="preloader__content"></div>
            <p className="preloader__text">Идет поиск новостей...</p>
        </section>
    );
}

export { Preloader };