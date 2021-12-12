import React from "react";
import './Register.css';

function Register() {
    return (
        <section className="Register">
            <form action="" className="Register__form">
                <h1 className="Register__title">Добро пожаловать!</h1>
                <label className="Register__label">
                    Имя
                    <input
                        type="text"
                        className="Register__input"
                        name="name"/>
                </label>
                <label className="Register__label">
                    E-mail
                    <input
                        name="email"
                        type="email"
                        className="Register__input"/>
                </label>
                <label className="Register__label">
                    Пароль
                    <input
                        type="password"
                        className="Register__input"/>
                </label>
                <button type="submit" className="Register__button">Зарегистрироваться</button>
                <p className="Register__text">Уже зарегистрированы? <a href="#" className="Register__link">Войти</a></p>
            </form>

        </section>
    );
}

export default Register;