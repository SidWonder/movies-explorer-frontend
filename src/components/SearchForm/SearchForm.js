import {React, useEffect, useRef, useState} from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MovieApi from "../../utils/MoviesApi";
import ValidationError from "../ValidationError/ValidationError";

function SearchForm ({search, pageType}) {

    const [valid, setValid] = useState(true);
    const [inputValue, setInputValue] = useState()
    const [errorText, setErrorText] = useState(null);

    function formHandler(event){
        event.preventDefault();
        const searchInput = event.target.searchInput;
        const searchText = searchInput.value;
        if(!searchText.length) {
            search('', pageType)
        } else if(searchText.length >= 3) {
            search(searchText, pageType)
        } else {
            console.log('form error',searchInput.validity.valid,  searchInput.validationMessage)
            setErrorText(searchInput.validationMessage);
            setValid(false);
        }
    }

    function handleInputChange (event) {
        setErrorText(null);
        setInputValue(event.target.value);
    }

    useEffect(()=>{}, [errorText]);

    return (
        <form
            name='searchForm'
            className="SearchForm"
            onSubmit={formHandler}
            noValidate
            >
                <label
                    className="SearchForm__label"
                >
                <input required
                   minLength={3}
                   type="text"
                       name="searchInput"
                   placeholder="Фильм"
                   className="SearchForm__input"
                    onChange={handleInputChange}
                ></input>
                    {!valid && <ValidationError errorText={errorText}/>}
                <button className="SearchForm__button">Найти</button>
                </label>
                <FilterCheckbox type="Короткометражки" />
    </form>);
}

export default SearchForm;