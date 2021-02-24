import React from 'react';
import './SavedInfo.css';
import { CurrentUserContext } from '../../context/currentUserContext.js';
import * as transform from '../../utils/infoTransformer.js';

function SavedInfo(props) {
    const currentUser = React.useContext(CurrentUserContext); {/*currentUser.name*/}

    React.useEffect(()=>{
        props.keyWordsArray();
    }, [])

    function keyWordFormat() {
        //console.log(props.keyWords);
        if (props.keyWords.length === 1) {
            return 1;
        } else 
        if (props.keyWords.length === 2) {
            return 2;
        } else
        if (props.keyWords.length === 3) {
            return 3;
        } else
        if (props.keyWords.length === 0) {
            return 0;
        } else {
            return props.keyWords.length;
        }
    }

    return (
        <section className="saved-info">
            <div className="saved-info__content">
                <p className="saved-info__tag">Сохранённые статьи</p>
                <h2 className="saved-info__title">{currentUser}, у вас {`${props.articles.length}`} {`${transform.endingTransform(props.articles.length)}`}</h2>
                <p className="saved-info__text">
                    По ключевым словам: 
                    {
                        keyWordFormat() === 1 ? <span className="saved-info__keys"> {`${props.keyWords[0]}`} </span> :
                        keyWordFormat() === 2 ? 
                        <>
                            <span className="saved-info__keys"> {`${props.keyWords[0]}`}, </span>
                            <span className="saved-info__keys">{`${props.keyWords[1]}`}</span>
                        </> : 
                        keyWordFormat() === 3 ?
                        <>
                            <span className="saved-info__keys"> {`${props.keyWords[0]}`}, </span>
                            <span className="saved-info__keys"> {`${props.keyWords[1]}`} </span> и
                            <span className="saved-info__keys"> {`${props.keyWords[2]}`} </span>
                        </> :
                        keyWordFormat() === 0 ?
                        '' :
                        <>
                            <span className="saved-info__keys"> {`${props.keyWords[0]}`}, </span>
                            <span className="saved-info__keys"> {`${props.keyWords[1]}`} </span> и
                            <span className="saved-info__keys"> {`${props.keyWords.length - 2}`} другим</span>
                        </>
                    }
                    
                </p>
            </div>
        </section>
    );
}

export { SavedInfo };