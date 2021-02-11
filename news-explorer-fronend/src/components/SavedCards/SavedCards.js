import React from 'react';
import './SavedCards.css';
import { CardList } from '../CardList/CardList.js';
import { NewsCard } from '../NewsCard/NewsCard.js';
import * as infoTransform from '../../utils/infoTransformer.js';

function SavedCards(props) {

    function isSaved(card) {
        return (card.isSaved ? 
            <NewsCard 
                photo = {card.urlToImage}
                data = {infoTransform.dataTransform(card.publishedAt)}
                title = {infoTransform.titleTransform(card.title)}
                text = {infoTransform.textTransform(card.content)}
                source = {card.source.name}
                link = {card.url}
                key = {card.url}
                keyWord = {card.keyWord}
                isLogin = {props.isLogin}
                isMain = {false}
            /> : '');
    }

    return (
        <section className="saved-cards">
            <ul className="saved-cards__content">
                {
                    props.cards.map((card) =>
                        isSaved(card)
                    )
                }
            </ul>
        </section>
    );
}

export { SavedCards };