import React, {useEffect, useState} from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import {showMoviesSettings} from "../../utils/Constants";

function SavedMovies({search, getFavMovies,removeMovieFromFav ,loggedIn, filtredMovies, movies}) {
    const [moviesForRender, setMoviesForRender] = useState([]);

    useEffect(() => {
        setMoviesForRender(movies)
    }, [moviesForRender])
    return (
        <section className="SavedMovies">
            <Header pageType={'savedMovies'}/>
            <SearchForm
                pageType={'savedMovies'}
                search={search}
            />
            <MoviesCardList cards={moviesForRender}
                            favMovies={moviesForRender}
                            removeMovieFromFav={removeMovieFromFav}
                            pageType={'favorites'}/>
        </section>
    )
}

export default SavedMovies
