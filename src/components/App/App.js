import './App.css';
import {React, useState, useEffect} from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

import MoviesApi from "../../utils/MoviesApi";

function App() {

    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatFilmDB')) || null);
    const [favMoviesID, setFavMoviesID] = useState(localStorage.getItem('favMovies'));
    const [favMoviesCards, setFavMoviesCards] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);

    useEffect(() => {
        localStorage.setItem('favorEvents', favMoviesID);
        favMoviesArrCreator();
    }, [favMoviesID]);

    function addMovieToFavorite(movieID) {
        console.log('dw');
        //TODO добавить запрос к апи
        const ids = `${favMoviesID};${movieID}`;
        setFavMoviesID(ids);
    }

    function removeMovieFromFavorite(movieID) {
        //TODO добавить запрос к апи
        const item = setFavMoviesID.split(';').indexOf(movieID);
        if (item !== -1) {
            const start = item;
            const end = item + 1;
            setFavMoviesID(
                favMoviesID
                    .split(';')
                    .slice(0, start)
                    .concat(favMoviesID.split(';').slice(end))
                    .join(';'),
            );
        }
    }

    function searchAllMovies(searchText) {
        if(!allMovies) {
            MoviesApi.getData()
                .then(res=> {
                    setAllMovies(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                })
                .catch(err=> console.log(err))
        }
        setSearchQuery(searchText);
        setSearchResult(allMovies.filter(x=> x.nameRU.match(searchQuery)));
        console.log(searchResult);
    }

    function favMoviesArrCreator() {
        console.log(favMoviesID)
        if(favMoviesID){
            let favMoviesArr = []
            favMoviesID.split(';').forEach(x=> {
                if(allMovies.filter(y=> x == y.id).length) {
                    favMoviesArr.push(allMovies.filter(y=> x == y.id)[0])
                }
            })
            console.log(favMoviesArr);
        }
    }

  return (
    <div className="App">
        <Routes>
            <Route
                exact path="/"
                element={<Main/>} />
            <Route
                path="/movies"
                element={<Movies
                    search={searchAllMovies}
                    movies={allMovies}
                    addMovieToFav={addMovieToFavorite}
                    removeMovieFromFav={removeMovieFromFavorite}
                />} />
            <Route
                path="/saved-movies"
                element={<SavedMovies />} />
            <Route
                path="/profile"
                element={<Profile />} />
            <Route path="/signin"
                  element={ <Login />} />
            <Route
                exactly path="/signup"
                element={<Register />} />
            <Route path="/*" element={<NotFound />}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
