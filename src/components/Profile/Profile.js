import {React, useContext} from "react";
import './Profile.css';
import Header from "../Header/Header";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Profile({handleUpdateUserData}) {

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

    const {user} = currentUser;
    const {name, email} = user;
    console.log(name, email);

    function formSubmiter(event){
        event.preventDefault();
        const emailInput = event.target.Profile__email.value;
        const nameInput = event.target.Profile__name.value;
            console.log(emailInput, nameInput)
            handleUpdateUserData({name:nameInput, email: emailInput });
    }

    return (
        <>
            <Header pageType={'profile'}/>
            <section className="Profile">
                <h1 className="Profile__title">Привет, {name}!</h1>
                <form noValidate={true} onSubmit={formSubmiter} className="Profile__container">
                    <label className="Profile__textContainer">
                        <p className="Profile__text">Имя</p>
                        <input minLength={1} id='Profile__name' className="Profile__text" type='text' placeholder={name}></input>
                    </label>
                    <label className="Profile__textContainer">
                        <p className="Profile__text">E-mail</p>
                        <input id='Profile__email' className="Profile__text" type='email'placeholder={email}></input>
                    </label>
                    <button type="submit" className="Profile__button Profile__button_registration">Редактировать</button>
                    <button className="Profile__button Profile__button_logout">Выйти из аккаунта</button>
                </form>

            </section>
        </>
    );
}

export default Profile;