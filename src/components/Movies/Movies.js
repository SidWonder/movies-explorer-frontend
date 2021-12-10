import React from "react";
import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
    return (
        <section className="Movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    );
}

export default Movies;