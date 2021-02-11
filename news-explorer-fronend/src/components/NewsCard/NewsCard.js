import React from 'react';
import './NewsCard.css';

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

    function handleClick() {
        if (props.isLogin) {
            setIsSaved(!isSaved);
        }
    }

    function deleteCard() {
        setIsDeleted(true);
    }

    return (
        <li className={`element ${isDeleted ? 'element_hidden' : ''}`}>
            <img className="element__photo" src={props.photo} alt={`${props.title}`} />
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
                <p className="element__key-word">{props.keyWord}</p> : ''
            }
            {
                props.isMain ?
                <button type="button" className={`element__bookmark ${isSaved ? `element__bookmark_blue` : ''} `} onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} aria-label="Сохранить"></button> :
                <button type="button" className={`element__bookmark element__bookmark_delete`} onClick={deleteCard} aria-label='Удалить'></button>
            }
            
        </li>
    );
}

export { NewsCard };