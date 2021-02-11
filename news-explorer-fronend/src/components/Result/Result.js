import React from 'react';
import './Result.css';
import { CardList } from '../CardList/CardList.js';

function Result(props) {

    return (
        <section className="result">
            <div className="result__content">
                <h2 className="result__title">Результаты поиска</h2>
                <CardList
                    cards = {props.cards}
                    count = {props.count}
                    isLogin = {props.isLogin}
                />
                <div className="result__button-place">
                    <button className="result__button" onClick={props.changeNumberOfCards}>Показать еще</button>
                </div>
            </div>
        </section>
    );
}

export { Result };