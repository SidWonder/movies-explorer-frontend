import React, {useEffect} from "react";
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";

function Movies({search, movies, addMovieToFav, removeMovieFromFav, favMovies}) {

    useEffect(()=>{},[movies])

    return (
        <section className="Movies">
            <Header pageType={'movies'}/>
            <SearchForm search={search}/>
            <MoviesCardList
                cards={movies}
                favMovies={favMovies}
                pageType={'allMovies'}
                addMovieToFav={addMovieToFav}
                removeMovieFromFav={removeMovieFromFav}
            />
        </section>
    );
}

export default Movies;