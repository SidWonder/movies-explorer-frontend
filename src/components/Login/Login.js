import {React, useState, useEffect} from "react";
import './Login.css';
import Header from "../Header/Header";
import {Link, useHistory} from "react-router-dom";

function Login({handleLogin, loggedIn}) {

    const history = useHistory();

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);

    const handleInputError = (input, message, isError) => {
        const inputError = document.getElementById(`${input.id}Error`);
        inputError.textContent = message;
        inputError.classList.toggle('spf__error-message_shown', isError);
    };

    const checkFormValidity = () => {
        const inputs = Array.from(document.getElementsByTagName('input'));
        const areAllInputsValid = inputs.every((input) => input.validity.valid);
        console.log(areAllInputsValid);
        setAllowSubmit(areAllInputsValid);
    };

    const validateInputOnChange = (e) => {
        const input = e.target;

        if (input.validity.valid) {
            handleInputError(input, input.validationMessage, false);
        } else {
            input.dataset.valid = false;
            handleInputError(input, input.validationMessage, true);
        }
        checkFormValidity();
    };

    const setInputListeners = () => {
        const emailInput = document.getElementById('Login__email');
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
                emailInput.setCustomValidity('Это не похоже на настоящий email.');
            } else {
                emailInput.setCustomValidity('');
            }
        });

        const passwordInput = document.getElementById('Login__password');
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
    function submitLogin(event) {
        event.preventDefault();
        const userEmail = event.target.email.value;
        const userPassword = event.target.password.value;
        handleLogin(userEmail, userPassword)
        setAllowSubmit(false);
    }

    return (
        <section className="Login">
            <Header pageType={'login'}/>
            <form
                noValidate={true}
                autoComplete="off"
                onSubmit={submitLogin}
                className="Login__form">
                <label className="Login__label">
                    E-mail
                    <input
                        id="Login__email"
                        name="email"
                        type="text"
                        autoComplete="off"
                        placeholder="example@test.ru"
                        pattern="^\S+@\S+\.\S+$"
                        minLength="2"
                        className="Login__input"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateInputOnChange(e);
                        }}
                        value={email}
                        required
                    />
                    <span className="Login__errorText" id="Login__emailError"></span>
                </label>
                <label className="Login__label">
                    Пароль
                    <input
                    style={{background: 'none'}}
                        id="Login__password"
                        name='password'
                        type="password"
                        autoComplete='off'
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateInputOnChange(e);
                        }}
                        value={password}
                        minLength="8"
                        className="Login__input"/>
                    <span className="Login__errorText" id="Login__passwordError"></span>
                </label>
                <button
                    disabled={!allowSubmit}
                    type="submit"
                    className="Login__button">Войти</button>
                <p className="Login__text">Ещё не зарегистрированы? <Link to="/signup"
                                                                          className="Login__link">Регистрация</Link></p>
            </form>

        </section>
    );
}

export default Login;