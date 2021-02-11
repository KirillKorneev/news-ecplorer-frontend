import React from 'react';
import './Footer.css';

function Footer(props) {

    return (
        <footer className='footer'>
            <div className='footer__content'>
                <a href="/" className='footer__logo'>© 2020 Supersite, Powered by News API</a>
                <div className="footer__info">
                    <div className="footer__hrefs">
                        <a href="/" className='footer__href'>Главная</a>
                        <a href="https://praktikum.yandex.ru/" className='footer__href'>Яндекс.Практикум</a>
                    </div>
                    <div className={`footer__icons`}>
                        <div className="footer__icon">
                            <a href="https://github.com/KirillKorneev" className="footer__github"/>
                        </div> 
                        <div className="footer__icon">
                            <a href="https://ru-ru.facebook.com/" className="footer__fb"/>
                        </div> 
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { Footer };