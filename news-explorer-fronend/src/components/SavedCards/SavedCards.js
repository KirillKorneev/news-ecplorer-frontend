import React from 'react';
import './SavedCards.css';
import { CardList } from '../CardList/CardList.js';
import { NewsCard } from '../NewsCard/NewsCard.js';
import * as infoTransform from '../../utils/infoTransformer.js';

function SavedCards(props) {

    //props.setIsResult(false);
    return (
        <section className="saved-cards">
            <ul className="saved-cards__content">
                {
                    props.articles.map((card) =>
                        <NewsCard 
                            id = {card._id}
                            photo = {card.image}
                            data = {card.date}
                            title = {card.title}
                            text = {card.text}
                            source = {card.source}
                            link = {card.link}
                            key = {card.link}
                            keyWord = {card.keyword}
                            isLogin = {props.isLogin}
                            isMain = {false}
                            deleteArticle = {props.deleteArticle}
                        />
                    )
                }
            </ul>
        </section>
    );
}

export { SavedCards };