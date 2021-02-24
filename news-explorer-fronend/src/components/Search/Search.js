import React from 'react'
import './Search.css';

function Search(props) {
    const [isTapped, setIsTapped] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [text, setText] = React.useState('');
    const [isError, setIsError] = React.useState(false);


    function handleSubmit(evt) {
        evt.preventDefault();

        setIsHovered(false);
        setIsTapped(true);

        if (text === '') {
            setIsError(true)
        }
        else {
            props.searchNews(text)
            setIsError(false);
        }
    }

    function handleChangeInput(e) {
        setText(e.target.value)
    }

    function handleHoverEnter() {
        setIsHovered(!isHovered);
    }

    function handleHoverLeave() {
        setIsHovered(!isHovered);
        setIsTapped(false);
    }

    return (
        <>
            <form className="search">
                <input ref={props.keyWordInput} id="search-input" name="inputSearch" required type="text" minLength="2" maxLength="200" placeholder="Введите тему новости" className="search__input" value={text} onChange={handleChangeInput}/>
                <button className={`search__button ${isTapped ? 'search__button_tapped' : ''} ${isHovered ? 'search__button_hover' : ''}`} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleSubmit} >Искать</button>
            </form>
            {
                isError ? <span className="search__error">Введите ключевое слово!</span> : ''
            }
        </>
    );
}

export { Search };