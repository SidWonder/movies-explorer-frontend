import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, pageType, addMovieToFav,favMovies ,removeMovieFromFav}) {
    function isFavorite(id){
        const isFavorite = favMovies.filter(x=> x.movieId === id)
        if(isFavorite.length) {
            return true;
        } else {
           return false;
        }
    }

    function handleAddToFavorite(movie){
        addMovieToFav(movie);
    }

    function handleRemoveFromFavorite(movie){
        if(movie){
           return removeMovieFromFav(movie._id);
        }
        const movieIdToRemove = favMovies.filter(x=> x.movieId === movie.id)[0]._id;
       return removeMovieFromFav(movieIdToRemove);
    }

    return (
        <section className="MoviesCardList">
        { pageType === 'allMovies' &&
                cards?.map((x, i) => {
                        return (
                    <MoviesCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={`https://api.nomoreparties.co${x.image.url}`}
                                movieInFavorite={isFavorite(x.id)}
                                addMovieToFav={()=>handleAddToFavorite(x)}
                                removeMovieFromFav={()=>handleRemoveFromFavorite(x)}
                                type={pageType}
                                movieId={x.id}
                                key={x.id}
                                />
                )})
        }
        {pageType === 'favorites' && cards?.map((x) => {
                return (
                    <MoviesCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={x.image}
                                movieInFavorite={true}
                                removeMovieFromFav={()=>handleRemoveFromFavorite(x)}
                                type={pageType}
                                key={x.id}
                    />
                )})}

        </section>
    )
}

export default MoviesCardList;