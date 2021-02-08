import React from 'react';
import './Popup.css';

function Popup(props) {

    return (
        <>
            <div className={`overlay ${props.isOpen ? `overlay_open` : ``}`} onClick={props.onClose}></div>
                <div className={`popup ${props.isOpen ? `popup_open` : ``}`}>
                {props.children}
                <button className="popup__close" onClick={props.onClose}></button>
            </div>
        </>
        
        
    );
}

export { Popup };