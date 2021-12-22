import React from "react";
import './Login.css';
import Header from "../Header/Header";
import {Link} from "react-router-dom";

function Login({handleLogin}) {

    function submitLogin(event){
        event.preventDefault();
        const userEmail = event.target.email.value;
        const userPassword = event.target.password.value;
        handleLogin(userEmail,userPassword)
    }

    return (
        <section className="Login">
            <Header pageType={'login'}/>
            <form
                onSubmit={submitLogin}
                className="Login__form">
                <label className="Login__label">
                    E-mail
                    <input
                        name="email"
                        type="email"
                        className="Login__input"/>
                </label>
                <label className="Login__label">
                    Пароль
                    <input
                        name='password'
                        type="password"
                        className="Login__input"/>
                </label>
                <button type="submit" className="Login__button">Войти</button>
                <p className="Login__text">Ещё не зарегистрированы? <Link to="/signup" className="Login__link">Регистрация</Link></p>
            </form>

        </section>
    );
}

export default Login;