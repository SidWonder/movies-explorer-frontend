import React, {useEffect, useState, useReducer} from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import {PAGE_TYPES, shortFilmDuration} from "../../utils/Constants";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SavedMovies({logout, removeMovieFromFav ,loggedIn, movies, getFavMovies}) {

    const {SAVED_MOVIES} = PAGE_TYPES;
    const [moviesForRender, setMoviesForRender] = useState( []);
    const [searchQuery, setSearchQuery] = useState('');
    const [shortFilmFlag, setShortFilmFlag] = useReducer(checked => !checked,  false);
    useEffect(() => {
        setMoviesForRender(movies)
    }, [movies]);

    useEffect(()=>{
      if(searchQuery.length) {
        searchMovie()
      }
    },[searchQuery, shortFilmFlag]);

    function searchMovie(){
      console.log('поиск вызыван', movies)
      const pureQuery = searchQuery.trim();
      const reg = new RegExp(pureQuery, "gi");

      let searchResults = movies.filter(x => {
        return x.nameRU.match(reg)
          || (x.nameEN && x.nameEN.match(reg))
          || (x.description && x.description.match(reg))
      });
      if(shortFilmFlag) {
        searchResults = searchResults.filter(x => x.duration <= shortFilmDuration);
      }

      console.log(searchResults);

      if (searchResults.length) {
        setMoviesForRender(searchResults);
      } else {
        setMoviesForRender('nullSearch');
      }
  }

    return (
        <section className="SavedMovies">
            <Header
                pageType={'savedMovies'}
                loggedIn={loggedIn}
                logout={logout}/>
          <div className="SavedMovies__container">
            <SearchForm
              searchInputQuery = {searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FilterCheckbox
            type={"Короткометражки"}
            setFlag={setShortFilmFlag}
            currentFlag={shortFilmFlag}
            />
          </div>
               {moviesForRender === "nullSearch" && (
        <p className="Movies__null-search">Ничего не найдено</p>
      )}
            { moviesForRender.length && moviesForRender !== "nullSearch" &&  <MoviesCardList cards={moviesForRender}
                            favMovies={moviesForRender}
                            removeMovieFromFav={removeMovieFromFav}
                            pageType={SAVED_MOVIES}
                            getFavMovies={getFavMovies}/>}
        </section>
    )
}

export default SavedMovies
