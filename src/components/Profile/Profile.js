import React from "react";
import './Profile.css';

function Profile() {
    return (
        <section className="Profile">
            <form action="" className="Profile__form">
                <h1 className="Profile__title">Привет, Виталий!</h1>
                <label className="Profile__label Profile__label_name">
                    <input
                        type="text"
                        className="Profile__input"
                        name="name"/>
                </label>
                <label className="Profile__label  Profile__label_email">
                    <input
                        name="email"
                        type="email"
                        className="Profile__input"/>
                </label>
                <button type="submit" className="Profile__button">Зарегистрироваться</button>
                <a href="#" className="Profile__link">Выйти из аккаунта</a>
            </form>

        </section>
    );
}

export default Profile;