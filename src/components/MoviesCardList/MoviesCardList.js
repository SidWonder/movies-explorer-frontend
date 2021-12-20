import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, pageType, addMovieToFav, removeMovieFromFav}) {
    return (
        <section className="MoviesCardList">
        { pageType === 'allMovies' &&
                cards.map((x, i) => {
                        return (
                    <MoviesCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={`https://api.nomoreparties.co${x.image.url}`}
                                movieInFavorite={x.movieInFavorite}
                                addMovieToFav={addMovieToFav}
                                removeMovieFromFav={removeMovieFromFav}
                                type={pageType}
                                movieId={x.id}
                                key={x.id}
                                />
                )})
        }
        {pageType === 'favorites' && cards.filter(y=> y.movieInFavorite).map((x, i) => {
                return (
                    <MoviesCard movieName={x.movieName}
                                movieLength={x.movieLength}
                                movieCover={x.movieCover}
                                movieInFavorite={x.movieInFavorite}
                                type={pageType}
                                key={i}
                    />
                )})}

        </section>
    )
}

export default MoviesCardList;