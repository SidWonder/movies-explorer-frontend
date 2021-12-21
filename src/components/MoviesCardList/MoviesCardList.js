import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, pageType, addMovieToFav,favMovies ,removeMovieFromFav}) {

    function isFavorite(id){
        console.log(id, favMovies)
        if(favMovies){
            // console.log(id, favMovies.split(';').includes(''+id))
            return favMovies.split(';').includes(''+id);
        }


    }

    return (
        <section className="MoviesCardList">
        { pageType === 'allMovies' &&
                cards.map((x, i) => {
                        return (
                    <MoviesCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={`https://api.nomoreparties.co${x.image.url}`}
                                movieInFavorite={isFavorite(x.id)}
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