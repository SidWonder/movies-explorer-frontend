import { React, useEffect, useRef, useState} from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import ValidationError from "../ValidationError/ValidationError";
import MoviesApi from "../../utils/MoviesApi";
import {PAGE_TYPES} from "../../utils/Constants";

function SearchForm({search, pageType, moviesForSrch, setIsLoading}) {

    const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES;

    const [moviesFromApi, setMoviesFromApi] = useState(JSON.parse(localStorage.getItem('beatFilmDB')) || []);
    const [filteredResults, setFilteredResults] = useState([]);

    const [valid, setValid] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [errorText, setErrorText] = useState(null);
    const [shortFilmFlag, setShortFilmFlag] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            const savedInputValue = localStorage.getItem("searchQueryYa") || [];
            if (savedInputValue.length > 0) setInputValue(savedInputValue.replace(/['"]/gi, '').trim());
            isFirstRender.current = false;
        }
    }, []);

    useEffect(()=>{
        // console.log('hook was called')
        search(filteredResults);
    }, [filteredResults])

    useEffect(()=>{
        filterByShortFilmFlag();
    }, [shortFilmFlag])

    useEffect(() => {
    }, [errorText,shortFilmFlag]);

    function getMoviesFromApi() {
        const localBeatFilmDB = localStorage.getItem('beatFilmDB');
        setIsLoading(true);
        if (!localBeatFilmDB) {
            return MoviesApi.getData()
                .then(res => {
                    setMoviesFromApi(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                    tryToFilter(inputValue, shortFilmFlag, res)
                })
                .then(() => setIsLoading(false))
                .catch((err=> console.log(err)))
        } else {
            // setMoviesFromApi(JSON.parse(localBeatFilmDB));
            tryToFilter(inputValue, shortFilmFlag, moviesFromApi);
            setIsLoading(false);
        }
    }

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
           return checkPageBeforeSearch();
        }
    }

    function checkPageBeforeSearch() {
        // console.log(pageType)
        if(pageType === ALL_MOVIES){
           return getMoviesFromApi();

        } else if(pageType === SAVED_MOVIES){
            // console.log('try filter on saved', moviesForSrch, filteredResults);
            tryToFilter(inputValue, shortFilmFlag, moviesForSrch);
        }

    }

    function clearError() {
        setErrorText(null);
        setValid(true);
    }

    function tryToFilter(searchInputQuery, shortFilmFlag, allMovieCards) {
        const pureQuery = searchInputQuery.trim()
        const reg = new RegExp(pureQuery, "gi");


        // if(pageType === SAVED_MOVIES) {
        //     console.log('search in saved', searchInputQuery, shortFilmFlag, allMovieCards)
        //     return
        // }

        // const searchResults = allMovieCards.filter(x => {
        //     return x.nameRU.match(reg)
        //         || x.nameEN && x.nameEN.match(reg)
        //         || x.description && x.description.match(reg) &&
        //         (shortFilmFlag ? x.duration <= 40 : true)
        // });
        const searchResults = allMovieCards.filter(x => {
            return x.nameRU.match(reg)
                || (x.nameEN && x.nameEN.match(reg))
                || (x.description && x.description.match(reg))
        });
        if (searchResults.length) {
            localStorage.setItem("searchResults", JSON.stringify(searchResults));
            localStorage.setItem("searchQueryYa", JSON.stringify(inputValue));
            setFilteredResults(searchResults);
        } else {
            return search('nullSearch');
        }
    }

    function filterByShortFilmFlag(){
        console.log('filterByShortFilmFlag',shortFilmFlag, moviesForSrch)
        if(shortFilmFlag) {
            const filtredFilms = moviesForSrch.filter(x=> x.duration <= 40)
            console.log(filtredFilms);
            setFilteredResults(filtredFilms);
        } else {
            setFilteredResults(moviesForSrch);
        }
    }


    function handleToggleShortFilmFlag(flag){
        setShortFilmFlag(flag);
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
