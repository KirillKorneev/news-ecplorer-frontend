import React from 'react';
import { Popup } from '../Popup/Popup.js';
import './PopupRegister.css';

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
    name: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 2;
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



function PopupRegister(props) {
    const [data, setData] = React.useState({
        email: '',
        name: '',
        password: ''
    });

    ///true = error, false = ok
    const [errors, setErrors] = React.useState({
        email: {
            required: true,
            minLength: true,
            isEmail: true
        },
        name: {
            required: true,
            minLength: true,
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
        props.popupLoginOpen();
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
        const { email, name, password } = data;

        if (!email || !password){
            return;
        }

        props.register(email, name, password);

        setData({
            email: '',
            name: '',
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
    
            const nameValidationResult = Object.keys(validators.name)
                .map((errorKey) => {
                    const errorResult = validators.name[errorKey](name);
    
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
                name: nameValidationResult,
                password: passwordValidationResult
            });
        },
        [data, setErrors]
    );

    const { email, name, password } = data;
    const isEmailInvalid = Object.values(errors.email).some(Boolean);
    const isNameInvalid = Object.values(errors.name).some(Boolean);
    const isPasswordInvalid = Object.values(errors.password).some(Boolean);
    const isSubmitDisabled = isEmailInvalid || isNameInvalid || isPasswordInvalid;

    return (
        <Popup 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
        >
            <form onSubmit={handleSubmit} className="form">
                <h2 className="form__title">Регистрация</h2>
                <p className="form__label form__label_el_email">
                    Email
                </p>
                <input 
                    onChange={handleChange} 
                    id="email-input-reg" 
                    name="email" 
                    className="form__input form__input_el_email" 
                    type="email" 
                    placeholder="Введите почту"
                    value={email}
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
                    onChange={handleChange} 
                    id="password-input-reg" 
                    name="password" 
                    className="form__input form__input_el_pass" 
                    type="password" 
                    placeholder="Введите пароль"
                    value={password}
                />
                {
                    check(password) ? <span className="form__error"></span> : 
                    showPasswordError()
                }
                <p className={`form__label form__label_el_pass ${
                    check(password) ? '' : isPasswordInvalid ? 'form__label_valid' : ''
                }`}>
                    Имя
                </p>
                <input 
                    onChange={handleChange} 
                    id="name-input-reg" 
                    name="name" 
                    className="form__input form__input_el_name" 
                    type="text" 
                    placeholder="Введите своё имя"
                    value={name}
                />
                {
                    check(name) ? <span className="form__error"></span> : 
                    errors.name.minLength && <span className="form__error">Минимальное количество символов - 2!</span>
                }
                <button type="submit" className={`form__button ${isSubmitDisabled ? 'form__button_disabled' : ''} 
                    ${
                        check(name) ? '' : isNameInvalid ? 'form__button_valid' : ''
                    }
                `} disabled={isSubmitDisabled}>Зарегистрироваться</button>
                <p className="form__tag">
                    или &nbsp;
                    <span>
                        <a hrefa="#" className="form__transition" onClick={changePopup}>Войти</a>
                    </span>
                </p>
            </form>
        </Popup>
    );
}

export { PopupRegister };