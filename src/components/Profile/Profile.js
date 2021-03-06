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
          .then(()=>{
            console.log()
          })
          .catch((e) => console.log(e));
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
                nameInput.setCustomValidity('?????? ???????????????? ???????????????????????? ??????????????.');
            } else if (nameInput.validity.tooShort) {
                nameInput.setCustomValidity('?????? ???????????? ???????? ???????????? 2 ????????????????.');
            } else if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('?????????????? ???????? ?????? ???? ???????????????? ?????? ??????????????????.');
            } else {
                nameInput.setCustomValidity('');
            }
        });

        const emailInput = document.getElementById('Profile__email');
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
                emailInput.setCustomValidity('email ???????????? ?? ??????????????, ???? ???????????? ???????? ???????? example@test.ru');
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
                <h1 className="Profile__title">????????????, {name}!</h1>
                <form noValidate={true} onSubmit={(e) => handleFormSubmit(e)} className="Profile__container">
                    <label className="Profile__textContainer">
                        <p className="Profile__text">??????</p>
                        <input
                            className="Profile__text"
                            minLength={2}
                            id='Profile__name'
                            value={nameInput}
                            type='text'
                            pattern="^[??-????-??a-zA-Z]+(([' -][??-????-??a-zA-Z ])?[??-????-??a-zA-Z]*)*$"
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
                  <div className="Profile__updateStatus"></div>
                    <button disabled={!allowSubmit} type="submit"
                            className="Profile__button Profile__button_registration">??????????????????????????
                    </button>
                    <button onClick={logout} className="Profile__button Profile__button_logout">?????????? ???? ????????????????
                    </button>
                </form>

            </section>
        </>
    );
}

export default Profile;
