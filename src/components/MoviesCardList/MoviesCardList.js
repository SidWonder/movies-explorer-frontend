import React from "react";
import "./MoviesCardList.css";
import {PAGE_TYPES} from "../../utils/Constants";
import PureMovieCard from "../MoviesCard/MoviesCard";

const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES;

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

    function handleRemoveFromFavorite(movie, pType){
        console.log(movie, pType)
        if(pType === SAVED_MOVIES){
           return removeMovieFromFav(movie._id);
        } else if (pType === ALL_MOVIES) {
            const movieIdToRemove = favMovies.filter(x=> x.movieId === movie.id)[0]._id;
            return removeMovieFromFav(movieIdToRemove);
        }

    }

    return (
        <section className="MoviesCardList">
            {console.log(cards, "MoviesCardList")}
        { pageType === ALL_MOVIES &&
                cards?.map((x) => {
                        return (
                    <PureMovieCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={`https://api.nomoreparties.co${x.image.url}`}
                                movieInFavorite={isFavorite(x.id)}
                                addMovieToFav={()=>handleAddToFavorite(x)}
                                removeMovieFromFav={()=>handleRemoveFromFavorite(x, ALL_MOVIES)}
                                pageType={ALL_MOVIES}
                                movieId={x.id}
                                trailerLink={x.trailerLink || '#'}
                                key={x.id}
                                />
                )})
        }
        {pageType === SAVED_MOVIES && cards?.map((x) => {
                return (
                    <PureMovieCard movieName={x.nameRU}
                                movieLength={x.duration}
                                movieCover={x.image}
                                movieInFavorite={true}
                                removeMovieFromFav={()=>handleRemoveFromFavorite(x, SAVED_MOVIES)}
                                pageType={SAVED_MOVIES}
                                key={x._id}
                    />
                )})}

        </section>
    )
}

export default MoviesCardList;
