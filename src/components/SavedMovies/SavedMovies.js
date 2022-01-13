import React, {useEffect, useState} from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import {PAGE_TYPES} from "../../utils/Constants";

function SavedMovies({logout, removeMovieFromFav ,loggedIn, movies, getFavMovies}) {

    const {SAVED_MOVIES} = PAGE_TYPES;

    console.log(movies)
    const [moviesForRender, setMoviesForRender] = useState( []);
    useEffect(() => {
        setMoviesForRender(movies)
    }, [movies])
    return (
        <section className="SavedMovies">
            <Header
                pageType={'savedMovies'}
                loggedIn={loggedIn}
                logout={logout}/>
            <SearchForm
                pageType={SAVED_MOVIES}
                search={setMoviesForRender}
                moviesForSrch={movies}
            />
            <MoviesCardList cards={moviesForRender}
                            favMovies={moviesForRender}
                            removeMovieFromFav={removeMovieFromFav}
                            pageType={SAVED_MOVIES}
                            getFavMovies={getFavMovies}/>
        </section>
    )
}

export default SavedMovies
