import React, { useRef, useState} from "react";
import "./SearchForm.css";
import ValidationError from "../ValidationError/ValidationError";

function SearchForm({searchInputQuery ,setSearchQuery, searcher=()=>{}}) {

    const [valid, setValid] = useState(true);
    const searchInputValue = useRef();
    const [inputValue, setInputValue] = useState(searchInputQuery || '');
    const [errorText, setErrorText] = useState(null);

  function clearError() {
    setErrorText(null);
    setValid(true);
  }

    function handleChange(e) {
        clearError();
        setInputValue(e.target.value);
    }

    function handleSearch(e) {
        clearError();
        e.preventDefault();
        const srchQuery = searchInputValue.current.value;
        if (!srchQuery) {
            setErrorText('Нужно ввести ключевое слово для поиска');
            setValid(false);
        } else {
          setSearchQuery('');
          setSearchQuery(srchQuery);
        }
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
                       ref={searchInputValue}
                ></input>
                {!valid && <ValidationError errorText={errorText}/>}
                <button
                    className="SearchForm__button">Найти
                </button>
            </label>

        </form>);
}

export default SearchForm;
