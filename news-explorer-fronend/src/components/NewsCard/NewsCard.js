import React from 'react';
import './NewsCard.css';
import * as infoTransform from '../../utils/infoTransformer.js';
import { Link } from 'react-router-dom';

function NewsCard(props) {

    const [isWarning, setIsWarning] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const [isDeleted, setIsDeleted] = React.useState(false)

    function handleEnter() {
        if (!props.isLogin) {
            setIsWarning(true);
        }
    }

    function handleLeave() {
        if (!props.isLogin) {
            setIsWarning(false);
        }
    }

    const deleteCard = () => {
        props.deleteArticle(props.id);
    }

    function handleClick() {
        if (props.isLogin) {
            if (props.isSaved) {
                return;
            } else {
                setIsSaved(!isSaved);
                props.saveCard(
                    {
                        title: props.title,
                        text: props.text,
                        date: props.data,
                        source: props.source,
                        link: props.link,
                        image: props.photo
                    }
                )
            }
        }
    }

    return (
        <li className={`element ${isDeleted ? 'element_hidden' : ''}`}>
            <Link to={`${props.link}`}>
                <img className="element__photo" src={props.photo} alt={`${props.title}`} />
            </Link>
            <div className="element__info">
                <p className="element__data">{props.data}</p>
                <h2 className="element__title">{props.title}</h2>
                <p className="element__text">{props.text}</p>
                <a href={`${props.link}`} className="element__source">{props.source}</a>
            </div>
            <div className={`element__notion ${isWarning ? 'element__notion_open' : ''}`}>
                <p className='element__warning'>Войдите, чтобы сохранять статьи</p>
            </div>
            {
                !props.isMain ? 
                <p className="element__key-word">{infoTransform.keyWordTransform(props.keyWord)}</p> : ''
            }
            {
                props.isMain ?
                <button type="button" className={`element__bookmark ${isSaved ? `element__bookmark_blue` : ''} ${props.isSaved ? `element__bookmark_blue` : ''} `} onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} aria-label="Сохранить"></button> :
                <button type="button" className={`element__bookmark element__bookmark_delete`} onClick={deleteCard} aria-label='Удалить'></button>
            }
            
        </li>
    );
}

export { NewsCard };