import React from 'react';
import './CardList.css';
import { NewsCard } from '../NewsCard/NewsCard.js';
import * as infoTransform from '../../utils/infoTransformer.js';

function CardList(props) {

  return (
    <ul className="elements">
      {
        props.cards.slice(0, props.count).map((card) => 
          props.isSaved(card) ?
          <NewsCard 
            photo = {card.urlToImage}
            data = {infoTransform.dataTransform(card.publishedAt)}
            title = {infoTransform.titleTransform(card.title)}
            text = {infoTransform.textTransform(card.description)}
            source = {card.source.name}
            link = {card.url}
            key = {card.url}
            keyWordsArray = {props.keyWordsArray}
            saveCard = {props.saveCard}
            isMain = {true}
            isLogin = {props.isLogin}
            isSaved = {true}
            isSave = {props.isSaved}
          /> :
          <NewsCard 
            photo = {card.urlToImage}
            data = {infoTransform.dataTransform(card.publishedAt)}
            title = {infoTransform.titleTransform(card.title)}
            text = {infoTransform.textTransform(card.description)}
            source = {card.source.name}
            link = {card.url}
            key = {card.url}
            keyWordsArray = {props.keyWordsArray}
            saveCard = {props.saveCard}
            isMain = {true}
            isLogin = {props.isLogin}
            isSaved = {false}
            isSave = {props.isSaved}
          />
        
        )
      }
    </ul>
  );
}

export { CardList };