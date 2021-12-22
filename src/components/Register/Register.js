import React, {useState} from "react";
import './Register.css';
import {Link} from "react-router-dom";

import Header from "../Header/Header";

function Register({handleRegister, handleLogin}) {

    const [error, setError] = useState(false);

    function submitRegister(event){
    event.preventDefault();
    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;

    handleRegister(userName, userEmail, userPassword)
        .then(res => console.log(res))
        .then(() => handleLogin(userEmail, userPassword))
    }

    function handleError() {

    }

    return (
        <section className="Register">
            <Header pageType={'register'}/>
            <form
                noValidate={true}
                onSubmit={submitRegister}
                className="Register__form">
                <label className="Register__label">
                    Имя
                    <input
                        // onChange={handleError}
                        minLength={1}
                        placeholder="Username"
                        type="text"
                        className="Register__input"
                        name="name"/>

                </label>
                <label className="Register__label">
                    E-mail
                    <input
                        placeholder="name@domain.com"
                        name="email"
                        type="email"
                        className="Register__input"/>
                </label>
                <label className="Register__label">
                    Пароль
                    <input
                        minLength={8}
                        placeholder="Не менее 8 знаков"
                        type="password"
                        name="password"
                        className="Register__input"/>
                </label>
                <button type="submit" className="Register__button">Зарегистрироваться</button>
                <p className="Register__text">Уже зарегистрированы? <Link to="/signin" className="Register__link">Войти</Link></p>
            </form>

        </section>
    );
}

export default Register;