import React, {useState, useEffect} from "react";
import './Register.css';
import {Link, useHistory} from "react-router-dom";

import Header from "../Header/Header";

function Register({handleRegister, handleLogin, loggedIn}) {

    // const [error, setError] = useState(false);
    const [errorFromApi, setErrorFromApi] = useState(false);

    const history = useHistory();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [allowSubmit, setAllowSubmit] = useState(false);

    const handleInputError = (input, message) => {
        const inputError = document.getElementById(`${input.id}Error`);
        inputError.textContent = message;
    };

    const checkFormValidity = () => {
        const inputs = Array.from(document.getElementsByTagName('input'));
        const areAllInputsValid = inputs.every((input) => input.validity.valid);
        setAllowSubmit(areAllInputsValid);
    };

    const validateInputOnChange = (e) => {
        const input = e.target;
        setErrorFromApi(false);
        if (input.validity.valid) {
            input.classList.remove('Register__error_input')
            handleInputError(input, input.validationMessage, false);
        } else {
            input.dataset.valid = false;
            input.classList.add('Register__error_input')
            handleInputError(input, input.validationMessage, true);
        }
        checkFormValidity();
    };

    const setInputListeners = () => {
        // Слушатели для кастомных текстов ошибок инпутов
        const nameInput = document.getElementById('Register__name');
        nameInput.addEventListener('input', () => {
            if (nameInput.validity.patternMismatch) {
                nameInput.setCustomValidity('Имя может содержать только буквы, пробел и тире.');
            } else if (nameInput.validity.tooShort) {
                nameInput.setCustomValidity('Имя слишком короткое.');
            } else if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('Введите ваше имя на латинице или кириллице.');
            } else {
                nameInput.setCustomValidity('');
            }
        });

        const emailInput = document.getElementById('Register__email');
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
                emailInput.setCustomValidity('Это не похоже на настоящий email.');
            } else {
                emailInput.setCustomValidity('');
            }
        });

        const passwordInput = document.getElementById('Register__password');
        passwordInput.addEventListener('input', () => {
            if (passwordInput.validity.tooShort) {
                passwordInput.setCustomValidity(`Слишком короткий пароль, минимум 8 символов (Сейчас ${passwordInput.value.length}).`);
            } else {
                passwordInput.setCustomValidity('');
            }
        });
    };

    useEffect(() => {
        setInputListeners();
    }, []);

    useEffect(() => {
        loggedIn && history.push('/movies');
    }, [loggedIn]);


    function submitRegister(event) {
    event.preventDefault();


    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;

    handleRegister(userName, userEmail, userPassword)
    .then((data) => {
        if (data.ok) {
            return data.json();
        } else if (data.status === 409) {
            setErrorFromApi('Такой пользователь уже существует');
            throw new Error('Такой пользователь уже существует');
        }})
        .then((res) => {
            if(res && res.status !== 400 && res.status !== 409) {
                handleLogin(userEmail, userPassword)
            } else {
               return new Error();
            }
        })
        .then(()=> setAllowSubmit(false))
        .catch((err)=> console.log(err))
    }


    return (
        <section className="Register">
            <Header pageType={'register'}/>
            { errorFromApi && <div className="Register__error_api">{errorFromApi}</div>}
            <form
                noValidate={true}
                onSubmit={submitRegister}
                className="Register__form">
                <label className="Register__label">
                    Имя
                    <input
                        // onChange={handleError}
                        placeholder="Username"
                        type="text"
                        className="Register__input"
                        name="name"
                        id="Register__name"
                        onChange={(e) => {
                            setName(e.target.value);
                            validateInputOnChange(e);
                        }}
                        value={name}
                        maxLength="25"
                        minLength="2"
                        pattern="^[А-Яа-яa-zA-Z]+(([' -][А-Яа-яa-zA-Z ])?[А-Яа-яa-zA-Z]*)*$"
                        required
                        autoFocus="true"
                    />
                    <span className="Register__error_text" id="Register__nameError"></span>
                </label>
                <label className="Register__label">
                    E-mail
                    <input
                        placeholder="name@domain.com"
                        name="email"
                        type="email"
                        className="Register__input"
                        id="Register__email"
                        pattern="^\S+@\S+\.\S+$"
                        minLength="2"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateInputOnChange(e);
                        }}
                        value={email}
                        required
                        autoComplete="nope"
                    />
                    <span className="Register__error_text" id="Register__emailError"></span>
                </label>
                <label className="Register__label">
                    Пароль
                    <input
                        minLength={8}
                        placeholder="Не менее 8 знаков"
                        type="password"
                        name="password"
                        className="Register__input"
                        id="Register__password"
                        autoComplete="on"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateInputOnChange(e);
                        }}
                        value={password}
                        required
                    />
                    <span className="Register__error_text" id="Register__passwordError"></span>
                </label>
                <button disabled={!allowSubmit} type="submit" className="Register__button">Зарегистрироваться</button>
                <p className="Register__text">Уже зарегистрированы? <Link to="/signin" className="Register__link">Войти</Link></p>
            </form>

        </section>
    );
}

export default Register;
