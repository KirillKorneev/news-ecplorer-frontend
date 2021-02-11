import React from 'react';
import './SavedInfo.css';
import { CurrentUserContext } from '../../context/currentUserContext.js';

function SavedInfo(props) {
    const currentUser = React.useContext(CurrentUserContext); {/*currentUser.name*/}

    return (
        <section className="saved-info">
            <div className="saved-info__content">
                <p className="saved-info__tag">Сохранённые статьи</p>
                <h2 className="saved-info__title">{currentUser.name}, у вас 5 сохранённых статей</h2>
                <p className="saved-info__text">
                    По ключевым словам: 
                    <span className="saved-info__keys"> Природа, </span>
                    <span className="saved-info__keys">Тайга</span> и
                    <span className="saved-info__keys"> 2-м другим</span>
                </p>
            </div>
        </section>
    );
}

export { SavedInfo };