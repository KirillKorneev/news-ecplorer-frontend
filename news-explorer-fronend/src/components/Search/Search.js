import React from 'react'
import './Search.css';

function Search(props) {
    const [isTapped, setIsTapped] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [text, setText] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        setIsHovered(false);
        setIsTapped(true);
        props.searchNews(text)
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
        <form className="search">
            <input id="search-input" name="inputSearch" required type="text" minLength="2" maxLength="200" placeholder="Введите тему новости" className="search__input" value={text} onChange={handleChangeInput}/>
            <button className={`search__button ${isTapped ? 'search__button_tapped' : ''} ${isHovered ? 'search__button_hover' : ''}`} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleSubmit} >Искать</button>
        </form>
    );
}

export { Search };