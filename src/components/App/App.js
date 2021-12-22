import './App.css';
import {React, useState, useEffect} from 'react';
import {
    Routes,
    Route,
    useHistory
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
import mainApi from "../../utils/MainApi";

function App() {

    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatFilmDB')) || null);
    const [favMoviesID, setFavMoviesID] = useState(localStorage.getItem('favMovies') || null);
    const [favMoviesCards, setFavMoviesCards] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoggedIn, setIsLogged] = useState(false);

    useEffect(() => {
        localStorage.setItem('favorMovies', favMoviesID);
        favMoviesArrCreator();
    }, [favMoviesID]);

    useEffect(()=>{
        tryToFilter();
    }, [searchQuery, allMovies])

    function addMovieToFavorite(movieID) {
        console.log('dw');
        //TODO добавить запрос к апи
        const ids = `${favMoviesID};${movieID}`;
        localStorage.setItem('favMovies', ids);
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
        console.log('searchWasCalled', searchText)
        setSearchQuery(searchText);
        if(!allMovies) {
            MoviesApi.getData()
                .then(res=> {
                    setAllMovies(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                })
                .catch(err=> console.log(err))
        }

    }

    function tryToFilter() {
        console.log('hel', allMovies);
        if(allMovies){
            console.log(allMovies);
            const regex2 = new RegExp(searchQuery, "gi");
            const searchRes = allMovies.filter(x=> {
                return x.nameRU.match(regex2)
                    || x.nameEN && x.nameEN.match(regex2)
                    || x.description && x.description.match(regex2)
            });
            if(searchRes.length){
                setSearchResult(searchRes);
            }
        }
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
        }
    }

    function handleRegister(name, email, password) {
        console.log(name, email, password)
        return mainApi.createUser(name, email, password);
    }

    function handleLogin(email, password) {
        console.log(email, password)
        mainApi.login(email, password)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                else if (data.status === 400) {
                    throw new Error('не передано одно из полей');
                } else if (data.status === 401) {
                    throw new Error('пользователь с email не найден');
                } else {
                    throw new Error('что-то пошло не так');
                }
            })
            .then((data)=> {
                if (data.token) {
                    setIsLogged(true);
                    localStorage.setItem('token', data.token);
                }
            })
            .catch((err) => console.log(err));
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
                    movies={searchResult}
                    favMovies={favMoviesID}
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
                  element={ <Login
                      handleLogin={handleLogin}
                  />} />
            <Route
                exactly path="/signup"
                element={<Register
                    handleRegister={handleRegister}
                    handleLogin={handleLogin}
                />} />
            <Route path="/*" element={<NotFound />}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
