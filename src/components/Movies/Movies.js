import React, {useEffect, useState} from "react";
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

function Movies({search, movies, addMovieToFav, removeMovieFromFav, favMovies, getFavMovies, loggedIn, filtredMovies}) {
    console.log(filtredMovies)
    const showMoviesSettings = {
        large: {
            onStart: 12,
            addMore: 3,
        },
        medium: {
            onStart: 8,
            addMore: 2,
        },
        small: {
            onStart: 5,
            addMore: 2,
        },
    };

    const [isLoading, setIsLoading] = useState(false);
    const [moviesForRender, setMoviesForRender] = useState([]);
    const [moviesForRenderConfig, setMoviesForRenderConfig] = useState(showMoviesSettings.large);
    const [screenWidth, setScreenWidth] = useState(null);
    const [showMoreButton, setShowMoreButton] = useState(false)

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
        setMoviesForRender(filtredMovies?.slice(0, moviesForRenderConfig.onStart));
        setShowMoreButton(true);
    }, [filtredMovies, moviesForRenderConfig.onStart]);
    useEffect(()=>{},[filtredMovies])
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
        if (filtredMovies?.length === moviesForRender?.length) {
            setShowMoreButton(false);
        }
    }, [filtredMovies, moviesForRender]);
    function setNewWidth () {
        setScreenWidth(window.innerWidth);
    };


    function handleShowMore() {
        setMoviesForRender([
            ...moviesForRender,
            ...filtredMovies.slice(
                moviesForRender.length,
                moviesForRender.length + moviesForRenderConfig.addMore
            ),
        ]);
    };

    return (
        <section className="Movies">
            <Header
                loggedIn={loggedIn}
                pageType={'all-movies'}/>
            <SearchForm
                pageType={'allMovies'}
                search={search}/>
            {filtredMovies && <MoviesCardList
                cards={moviesForRender}
                favMovies={favMovies}
                pageType={'allMovies'}
                addMovieToFav={addMovieToFav}
                removeMovieFromFav={removeMovieFromFav}
            />}
            {filtredMovies === null &&
            <p className='Movies__null-search'>Ничего не найдено</p>}
            {isLoading && <Preloader />}
            {filtredMovies?.length > 0 && showMoreButton && (
                <button
                    className="Movies__show-more-button"
                    type="button"
                    onClick={handleShowMore}
                >
                    Ещё
                </button>
            )}
        </section>
    );
}

export default Movies;