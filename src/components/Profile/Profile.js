import React, { useContext, useState, useEffect} from "react";
import './Profile.css';
import Header from "../Header/Header";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Profile({handleUpdateUserData, logout}) {

    const { currentUser } = useContext(CurrentUserContext);
    const { email, name } = currentUser;
    const [nameInput, setName] = useState('');
    const [emailInput, setEmail] = useState('');

    const [initialName, setInitialName] = useState('');
    const [initialEmail, setInitialEmail] = useState('')

    const [allowSubmit, setAllowSubmit] = useState(false);
    

    useEffect(()=>{
            setName(name);
            setEmail(email);
            setInitialName(name);
            setInitialEmail(email);

    }, [currentUser]);

    function handleInputError  (input, message, isError) {
        console.log(input, message, isError)
        const inputError = document.getElementById(`${input.id}Error`);
        input.classList.toggle('profile__error', isError);
        inputError.textContent = message;
        inputError.classList.toggle('profile__error-message_shown', isError);
        setAllowSubmit(false);
    }

    function checkFormValidity () {
        const inputs = Array.from(document.getElementsByTagName('input'));
        const areAllInputsValid = inputs.every((input) => input.validity.valid);
        if(initialName === nameInput && initialEmail === emailInput) {
          setAllowSubmit(false);
        }
        setAllowSubmit(areAllInputsValid);
    }

    function handleFormSubmit (event){
        event.preventDefault();
        console.log(nameInput, emailInput)
        handleUpdateUserData( nameInput, emailInput)
        setAllowSubmit(false);

    }

    function validateInputOnChange (event) {
        const input = event.target;

        if (input.validity.valid) {
            handleInputError(input, input.validationMessage, false);
        } else {
            input.dataset.valid = false;
            handleInputError(input, input.validationMessage, true);
        }
        checkFormValidity();
    }


    function setInputListeners () {
        const nameInput = document.getElementById('Profile__name');
        nameInput.addEventListener('input', () => {
            if (nameInput.validity.patternMismatch) {
                nameInput.setCustomValidity('Имя содержит недопустимые символы.');
            } else if (nameInput.validity.tooShort) {
                nameInput.setCustomValidity('Имя должно быть больше 2 символов.');
            } else if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('Введите ваше имя на латинице или кириллице.');
            } else {
                nameInput.setCustomValidity('');
            }
        });

        const emailInput = document.getElementById('Profile__email');
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
                emailInput.setCustomValidity('email указан с ошибкой, он должен быть вида example@test.ru');
            } else {
                emailInput.setCustomValidity('');
            }
        });
    }

    useEffect(() => {
        setInputListeners();
    }, []);


    return (
        <>
            <Header pageType={'profile'}/>
            <section className="Profile">
                <h1 className="Profile__title">Привет, {name}!</h1>
                <form noValidate={true} onSubmit={(e) => handleFormSubmit(e)} className="Profile__container">
                    <label className="Profile__textContainer">
                        <p className="Profile__text">Имя</p>
                        <input
                            className="Profile__text"
                            minLength={2}
                            id='Profile__name'
                            value={nameInput}
                            type='text'
                            pattern="^[А-Яа-яa-zA-Z]+(([' -][А-Яа-яa-zA-Z ])?[А-Яа-яa-zA-Z]*)*$"
                            required
                            onChange={(e) => {
                                setName(e.target.value);
                                validateInputOnChange(e);
                            }}
                            ></input>
                        <span className="profile__error-message" id="Profile__nameError" />
                    </label>
                    <label className="Profile__textContainer">
                        <p className="Profile__text">E-mail</p>
                        <input
                            id='Profile__email'
                            className="Profile__text"
                            type='email'
                            value={emailInput}
                            pattern="^\S+@\S+\.\S+$"
                            minLength="2"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateInputOnChange(e);
                            }}
                        ></input>
                        <span className="profile__error-message" id="Profile__emailError" />
                    </label>
                    <button disabled={!allowSubmit} type="submit"
                            className="Profile__button Profile__button_registration">Редактировать
                    </button>
                    <button onClick={logout} className="Profile__button Profile__button_logout">Выйти из аккаунта
                    </button>
                </form>

            </section>
        </>
    );
}

export default Profile;
