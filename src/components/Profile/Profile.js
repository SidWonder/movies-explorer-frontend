import React from "react";
import './Profile.css';
import Header from "../Header/Header";

function Profile() {
    return (
        <>
            <Header pageType={'profile'}/>
        <section className="Profile">
                <h1 className="Profile__title">Привет, Виталий!</h1>
            <div className="Profile__container">
                <div className="Profile__textContainer">
                    <p className="Profile__text">Имя</p>
                    <p  id='Profile__name' className="Profile__text">Виталя</p>
                </div>
                <div className="Profile__textContainer">
                    <p className="Profile__text">E-mail</p>
                    <p id='Profile__email' className="Profile__text">pochta@yandex.ru</p>
                </div>
                <button className="Profile__button Profile__button_registration">Редактировать</button>
                <button className="Profile__button Profile__button_logout">Выйти из аккаунта</button>
            </div>

        </section>
        </>
    );
}

export default Profile;