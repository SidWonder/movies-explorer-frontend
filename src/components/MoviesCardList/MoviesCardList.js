import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, pageType}) {
    return (
        <section className="MoviesCardList">
        { pageType === 'allMovies' &&
                cards.map((x, i) => {
                        return (
                    <MoviesCard movieName={x.movieName}
                                movieLength={x.movieLength}
                                movieCover={x.movieCover}
                                movieInFavorite={x.movieInFavorite}
                                type={pageType}
                                key={i}
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