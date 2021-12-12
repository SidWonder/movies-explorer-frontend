import React from "react";
import './Login.css';

function Login() {
    return (
        <section className="Login">
            <form action="" className="Login__form">
                <h1 className="Login__title">Рады видеть!</h1>
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
                        type="password"
                        className="Login__input"/>
                </label>
                <button type="submit" className="Login__button">Войти</button>
                <p className="Login__text">Уже зарегистрированы? <a href="#" className="Login__link">Регистрация</a></p>
            </form>

        </section>
    );
}

export default Login;