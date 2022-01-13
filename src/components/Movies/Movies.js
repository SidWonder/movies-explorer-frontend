import React, {useEffect, useState} from "react";
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

import {PAGE_TYPES, showMoviesSettings} from "../../utils/Constants";
import MoviesApi from "../../utils/MoviesApi";

function Movies({
                    search, movies, addMovieToFav, removeMovieFromFav, favMovies, getFavMovies, loggedIn,
                }) {

    const [isLoading, setIsLoading] = useState(false);
    const [moviesForRender, setMoviesForRender] = useState( []);
    const [moviesForRenderConfig, setMoviesForRenderConfig] = useState(showMoviesSettings.large);
    const [allMoviesArr, setAllMoviesArr] = useState(JSON.parse(localStorage.getItem('beatFilmDB')) || []);

    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('searchResults'))|| [])

    const [screenWidth, setScreenWidth] = useState(null);
    const [showMoreButton, setShowMoreButton] = useState(false)

    const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES
    useEffect(() => {
        setScreenWidth(window.innerWidth);
        if (screenWidth <= 760) {
            setMoviesForRenderConfig(showMoviesSettings.small);
        }
        if (screenWidth > 760 && screenWidth <= 900) {
            setMoviesForRenderConfig(showMoviesSettings.medium);
        }
        if (screenWidth > 900) {
            setMoviesForRenderConfig(showMoviesSettings.large);

        }
    }, [screenWidth]);
    useEffect(() => {
        setMoviesForRender(filteredMovies?.slice(0, moviesForRenderConfig.onStart));
        setShowMoreButton(true);
    }, [filteredMovies, moviesForRenderConfig.onStart]);
    useEffect(() => {
    }, [filteredMovies, allMoviesArr])
    useEffect(() => {
        function handleScreenResize() {
            setTimeout(setNewWidth, 600);
        }

        window.addEventListener("resize", handleScreenResize);

        return () => {
            window.removeEventListener("resize", handleScreenResize);
        };
    }, []);
    useEffect(() => {
        if (filteredMovies?.length === moviesForRender?.length) {
            setShowMoreButton(false);
        }
    }, [filteredMovies, moviesForRender]);

    function setNewWidth() {
        setScreenWidth(window.innerWidth);
    };


    function handleShowMore() {
        setMoviesForRender([...moviesForRender, ...filteredMovies.slice(moviesForRender.length, moviesForRender.length + moviesForRenderConfig.addMore),]);
    };

    function getMoviesFromApi() {
        setIsLoading(true);
        console.log('allMoviesArr', allMoviesArr);
        if (!allMoviesArr.length) {
            return MoviesApi.getData()
                .then(res => {
                    setAllMoviesArr(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                })
                .then(() => setIsLoading(false))
        }
        setIsLoading(false);
    }

    return (<section className="Movies">
            <Header
                loggedIn={loggedIn}
                pageType={ALL_MOVIES}/>
            <SearchForm
                pageType={ALL_MOVIES}
                search={setFilteredMovies}
                // getMoviesFromApi={getMoviesFromApi}
                moviesForSrch={allMoviesArr}
                setIsLoading={setIsLoading}
            />
            {(moviesForRender.length && moviesForRender !== 'nullSearch') && <MoviesCardList
                cards={moviesForRender}
                favMovies={favMovies}
                pageType={ALL_MOVIES}
                addMovieToFav={addMovieToFav}
                removeMovieFromFav={removeMovieFromFav}
            />}
            {moviesForRender === 'nullSearch' && <p className='Movies__null-search'>Ничего не найдено</p>}
            {isLoading && <Preloader/>}
            {filteredMovies?.length > 0 && showMoreButton && (<button
                    className="Movies__show-more-button"
                    type="button"
                    onClick={handleShowMore}
                >
                    Ещё
                </button>)}
        </section>);
}

export default Movies;