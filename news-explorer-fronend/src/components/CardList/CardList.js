import React from 'react';
import './CardList.css';
import { NewsCard } from '../NewsCard/NewsCard.js';
import * as infoTransform from '../../utils/infoTransformer.js';

function CardList(props) {

    return (
        <ul className="elements">
          {
            props.cards.slice(0, props.count).map((card) =>
              <NewsCard 
                photo = {card.urlToImage}
                data = {infoTransform.dataTransform(card.publishedAt)}
                title = {infoTransform.titleTransform(card.title)}
                text = {infoTransform.textTransform(card.content)}
                source = {card.source.name}
                link = {card.url}
                key = {card.url}
                keyWord = {card.keyWord}
                isMain = {true}
                isLogin = {props.isLogin}
              />
            )
          }
        </ul>
    );
}

export { CardList };