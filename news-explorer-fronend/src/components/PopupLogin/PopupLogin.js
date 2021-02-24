import React from 'react';
import { Popup } from '../Popup/Popup.js';
import './PopupLogin.css';

const validators = {
    email: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 5;
        },
        isEmail: (value) => {
            return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
        }
    },
    password: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 5;
        },
        containNumbers: (value) => {
            return !/[0-9]/.test(value);
        }
    }
};

function check(value) {
    if (value === '') {
        return true;
    }
    return false;
}

function PopupLogin(props) {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    });

    ///true = error, false = ok
    const [errors, setErrors] = React.useState({
        email: {
            required: true,
            minLength: true,
            isEmail: true
        },
        password: {
            required: true,
            minLength: true,
            containNumbers: true
        }
    });

    function showEmailError() {
        if (errors.email.minLength) {
            return <span className="form__error">Минимальное количество символов - 5!</span>
        }
    
        if(errors.email.isEmail) {
            return <span className="form__error">Введите коректный e-mail!</span>
        }
    }
    
    function showPasswordError() {
        if (errors.password.minLength) {
            return <span className="form__error">Минимальное количество символов - 5!</span>
        }
    
        if(errors.password.containNumbers) {
            return <span className="form__error">Пароль не содержет цифр!</span>
        }
    }

    function changePopup() {
        props.onClose();
        props.popupRegistrationOpen();
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setData((prevData) => ( {
            ...prevData,
            [name]: value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;

        if (!email || !password){
            return;
        }
        
        props.login(email, password);

        setData({
            email: '',
            password: ''
        })
    }

    React.useEffect(
        function validateInputs() {
            const { email, name, password } = data;
    
            const emailValidationResult = Object.keys(validators.email)
                .map((errorKey) => {
                    const errorResult = validators.email[errorKey](email);
    
                    return { [errorKey]: errorResult };
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {});

            const passwordValidationResult = Object.keys(validators.password)
                .map((errorKey) => {
                    const errorResult = validators.password[errorKey](password);
    
                    return { [errorKey]: errorResult };
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {});

    
            setErrors({
                email: emailValidationResult,
                password: passwordValidationResult
            });
        },
        [data, setErrors]
    );

    const { email, password } = data;
    const isEmailInvalid = Object.values(errors.email).some(Boolean);
    const isPasswordInvalid = Object.values(errors.password).some(Boolean);
    const isSubmitDisabled = isEmailInvalid || isPasswordInvalid;

    return (
        <Popup 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
        >
            <form onSubmit={handleSubmit} name="formAuth" action="#" method="post" className="form">
                <h2 className="form__title" onSubmit={handleSubmit}>Войти</h2>
                <p className="form__label form__label_el_email">
                    Email
                </p>
                <input 
                    value={email} 
                    onChange={handleChange} 
                    id="email-input-login"
                    name="email" 
                    className="form__input form__input_el_email" 
                    type="email" 
                    placeholder="Введите почту"
                />
                {
                    check(email) ? <span className="form__error"></span> : 
                    showEmailError()
                }
                <p className={`form__label form__label_el_pass ${
                    check(email) ? '' : isEmailInvalid ? 'form__label_valid' : ''
                }`}>
                    Пароль
                </p>
                <input 
                    value={password} 
                    onChange={handleChange} 
                    id="password-input-login" 
                    name="password" 
                    className="form__input form__input_el_pass" 
                    type="password" 
                    placeholder="Введите пароль"
                />
                {
                    check(password) ? <span className="form__error"></span> : 
                    showPasswordError()
                }
                <span className="form__server-error">{`${props.error}`}</span>
                <button type='submit' className={`form__button ${isSubmitDisabled ? 'form__button_disabled' : ''} 
                    ${
                        check(password) ? '' : isPasswordInvalid ? 'form__button_valid' : ''
                    }
                `}>Войти</button>
                <p className="form__tag">
                    или &nbsp;
                    <span>
                        <a type="button" className="form__transition" onClick={changePopup}>Зарегистрироваться</a>
                    </span>
                </p>
            </form>
        </Popup>
    );
}

export { PopupLogin };