import './App.css';
import {React, useState, useEffect} from 'react';
import {
    Routes,
    Route,
    useHistory,
    Switch,
    useLocation
} from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const history = useHistory();
    const token = localStorage.getItem("token");

    const currentLocation = useLocation();
    const path = currentLocation.pathname;

    useEffect(() => {
        localStorage.setItem('favorMovies', favMoviesID);
        favMoviesArrCreator();
    }, [favMoviesID]);

    useEffect(() => {
        tryToFilter();
    }, [searchQuery, allMovies])

    useEffect(() => {
        if (token) {
            tokenChecker();
        } else {
            console.log('чет не работает авторизация с токеном');
        }
    }, []);


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
        if (!allMovies) {
            MoviesApi.getData()
                .then(res => {
                    setAllMovies(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                })
                .catch(err => console.log(err))
        }

    }

    function tryToFilter() {
        console.log('hel', allMovies);
        if (allMovies) {
            console.log(allMovies);
            const regex2 = new RegExp(searchQuery, "gi");
            const searchRes = allMovies.filter(x => {
                return x.nameRU.match(regex2)
                    || x.nameEN && x.nameEN.match(regex2)
                    || x.description && x.description.match(regex2)
            });
            if (searchRes.length) {
                setSearchResult(searchRes);
            }
        }
    }

    function favMoviesArrCreator() {
        console.log(favMoviesID)
        if (favMoviesID) {
            let favMoviesArr = []
            favMoviesID.split(';').forEach(x => {
                if (allMovies.filter(y => x == y.id).length) {
                    favMoviesArr.push(allMovies.filter(y => x == y.id)[0])
                }
            })
        }
    }

    function tokenChecker() {
        if(token) {
            setIsLoggedIn(true);
            history.push(path);
            mainApi.getUserData()
                .then((res) => {
                    setCurrentUser(res);
                    getFavMovies();
                })
        } else {
            return;
        }
    }

    const getFavMovies = () => {
        mainApi.getFavMovies()
            .then(res => {
                setFavMoviesCards(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    function handleRegister(name, email, password) {
        return mainApi.createUser(name, email, password);
    }

    function handleLogin(email, password) {
        mainApi.login(email, password)
            .then((data) => {
                if (data.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    tokenChecker();
                    mainApi.setToken(data.token);
                    history.push("/movies");
                    setCurrentUser(data);
                }
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUserData({name, email}) {
        mainApi
            .editUserData({ name, email })
            .then((res) => {
                tokenChecker();
            })
            .catch((e) => console.log(e));
    }

    function handleLogout () {
        localStorage.removeItem("token");
        // localStorage.removeItem("moviesList");
        localStorage.removeItem("searchQuery");
        setIsLoggedIn(false);
        history.push("/");
        setCurrentUser({});
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>

                    <Route path="/signin">
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route
                        path="/signup">
                        <Register handleRegister={handleRegister} handleLogin={handleLogin}/>
                    </Route>
                    <ProtectedRoute
                        path='/movies'
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <Movies
                            loggedIn={isLoggedIn}
                            search={searchAllMovies}
                            movies={searchResult}
                            favMovies={favMoviesCards}
                            addMovieToFav={addMovieToFavorite}
                            removeMovieFromFav={removeMovieFromFavorite}
                            getFavMovies={getFavMovies}
                        />
                        <Footer />
                    </ProtectedRoute>

                    <ProtectedRoute
                        path="/saved-movies"
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <SavedMovies/>
                    </ProtectedRoute>
                    <ProtectedRoute
                        path="/profile"
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <Profile
                            handleUpdateUserData={handleUpdateUserData}
                        />
                    </ProtectedRoute>
                    <Route path="/*">
                        <NotFound/>
                    </Route>
                </Switch>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
