import React from 'react';
import './About.css';
import ava from '../../images/myphoto.jpg';

function About(props) {


    return (
        <section className="about">
            <div className="about__content">
                <img className="about__avatar" src={ava} alt="аватарка"/>
                <div className="about__info">
                    <h2 className="about__title">Об авторе</h2>
                    <p className="about__text">
                        Привет! Меня зовут Кирилл, я студент физического факультета МГУ. Занимаюсь разными вещами, в том числе программированием.
                        Мой стэк: 1) ПЛИС (VHDL/Verilog); 2) HTML/CSS/JS, React. 
                    </p>
                </div>
            </div>
        </section>
    );
}

export { About };