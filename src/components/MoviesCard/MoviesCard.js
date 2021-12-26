import React from "react";
import "./MoviesCard.css";

function MoviesCard({movieName , movieLength, movieCover, movieInFavorite, type, addMovieToFav, movieId, removeMovieFromFav}) {

    console.log(movieInFavorite);

    function handleToggleFav(){
        console.log(movieInFavorite)
        if(movieInFavorite){
            console.log('try to remove')
            removeMovieFromFav(movieId);
        } else {
            addMovieToFav(movieId);
        }

    }

    return (
        <div className="MoviesCard">
            <p className="MoviesCard__title">{movieName}</p>
            <p className="MoviesCard__length">{movieLength} минут</p>
            <img src={movieCover} alt={`Облошка фильма ${movieName}`} className="MoviesCard__image"/>
            {type === 'allMovies' && <button onClick={handleToggleFav} className={`MoviesCard__button ${movieInFavorite && 'MoviesCard__button_inFavoriteMovieList'}`}>{!movieInFavorite && 'Сохранить'}</button>}
            {type === 'favorites' && <button onClick={handleToggleFav} className='MoviesCard__button MoviesCard__button_inFavoriteList'></button>}
        </div>)
}

export default MoviesCard;