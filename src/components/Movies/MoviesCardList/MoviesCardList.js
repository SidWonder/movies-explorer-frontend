import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, pageType}) {
    return (
        <section className="MoviesCardList">
        { pageType === 'allMovies' &&
                cards.map(x => {
                        return (
                    <MoviesCard movieName={x.movieName}
                                movieLength={x.movieLength}
                                movieCover={x.movieCover}
                                movieInFavorite={x.movieInFavorite}
                                type={pageType}
                                />
                )})
        }
        {pageType === 'favorites' && cards.filter(y=> y.movieInFavorite).map(x => {
                return (
                    <MoviesCard movieName={x.movieName}
                                movieLength={x.movieLength}
                                movieCover={x.movieCover}
                                movieInFavorite={x.movieInFavorite}
                                type={pageType}
                    />
                )})}

        </section>
    )
}

export default MoviesCardList;