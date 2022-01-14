import { React, useEffect, useRef, useState} from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import ValidationError from "../ValidationError/ValidationError";
import { PAGE_TYPES } from "../../utils/Constants";

function SearchForm({setMovies, moviesForSrch, setIsLoading, pageType}) {

    const [valid, setValid] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [errorText, setErrorText] = useState(null);
    const [shortFilmFlag, setShortFilmFlag] = useState(false);
    const isFirstRender = useRef(true);

const {ALL_MOVIES} = PAGE_TYPES

    useEffect(() => {
        if (isFirstRender.current) {
            const savedInputValue = localStorage.getItem("searchQueryYa") || [];
            if (savedInputValue.length > 0) setInputValue(savedInputValue.replace(/['"]/gi, '').trim());
            isFirstRender.current = false;
        }
    }, []);

    useEffect(() => {
    }, [errorText]);

    function handleChange(e) {
        clearError();
        setInputValue(e.target.value);
    }

    function handleSearch(e) {
        clearError();
        e.preventDefault();

        if (!inputValue) {
            setErrorText('Нужно ввести ключевое слово');
            setValid(false);
        } else if (inputValue.length < 3) {
            setErrorText('Введите не менее трёх букв');
            setValid(false);
        } else {
           return tryToFilter(inputValue);
        }
    }

    function clearError() {
        setErrorText(null);
        setValid(true);
    }

    function tryToFilter(searchInputQuery, flag = false) {
      console.log(shortFilmFlag)
        const pureQuery = searchInputQuery.trim()
        const reg = new RegExp(pureQuery, "gi");

        let searchResults = moviesForSrch.filter(x => {
            return x.nameRU.match(reg)
                || (x.nameEN && x.nameEN.match(reg))
                || (x.description && x.description.match(reg))
        });

        if(flag) {
          searchResults = searchResults.filter(x => x.duration <= 40)
        }

        if (searchResults.length) {
          if(pageType === ALL_MOVIES) {
            localStorage.setItem("searchResults", JSON.stringify(searchResults));
            localStorage.setItem("searchQueryYa", JSON.stringify(inputValue));
            setIsLoading(false);
          }
            setMovies(searchResults);
        } else {
          if(pageType === ALL_MOVIES) {
            setIsLoading(false);
          }
          setMovies('nullSearch');
        }
    }

    function handleToggleShortFilmFlag(flag){
        setShortFilmFlag(flag);
        tryToFilter(inputValue, flag)
    }

    return (
        <form
            name='searchForm'
            className={`SearchForm`}
            onSubmit={handleSearch}
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
                       className={`SearchForm__input ${!valid ? 'SearchForm__input__error' : ''}`}
                       onChange={handleChange}
                       onFocus={clearError}
                       value={inputValue || ''}
                ></input>
                {!valid && <ValidationError errorText={errorText}/>}
                <button
                    className="SearchForm__button">Найти
                </button>
            </label>
            <FilterCheckbox
                type="Короткометражки"
                setFlag={handleToggleShortFilmFlag}
            />
        </form>);
}

export default SearchForm;
