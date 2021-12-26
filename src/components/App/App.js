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
import MainApi from "../../utils/MainApi";

function App() {

    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatFilmDB')) || null);
    const [favMoviesID, setFavMoviesID] = useState(localStorage.getItem('favMovies') || null);
    const [favMoviesCards, setFavMoviesCards] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const history = useHistory();
    const token = localStorage.getItem("token");

    const currentLocation = useLocation();
    const path = currentLocation.pathname;

    useEffect(() => {
        tryToFilter();
    }, [searchQuery])

    useEffect(() => {
        if (token) {
            tokenChecker();
        } else {
            console.log('чет не работает авторизация с токеном');
        }
    }, []);


    function addMovieToFavorite(movie) {
        const ids = `${favMoviesID};${movie.id}`;
        setFavMoviesID(ids);
        MainApi.addToFav(movie)
            .then(res => getFavMovies())
    }

    function removeMovieFromFavorite(movieID) {
        MainApi.removeFromFav(movieID)
            .then(res=> getFavMovies())
    }

    function searchAllMovies(searchText, pageType) {
        console.log('searchWasCalled', searchText)
        setSearchQuery(searchText);
        if (!allMovies) {
            MoviesApi.getData()
                .then(res => {
                    setAllMovies(res);
                    localStorage.setItem('beatFilmDB', JSON.stringify(res));
                    tryToFilter(pageType);
                })
                .catch(err => console.log(err))
        }

    }

    function tryToFilter(pageType) {
        const searchSource = pageType === 'AllMovies' ? allMovies : searchResult;
        if (searchSource) {
            const regex2 = new RegExp(searchQuery, "gi");
            const searchRes = searchSource.filter(x => {
                return x.nameRU.match(regex2)
                    || x.nameEN && x.nameEN.match(regex2)
                    || x.description && x.description.match(regex2)
            });
            if (searchRes.length) {
                setSearchResult(searchRes);
            } else {
                setSearchResult(null);
            }
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
                            logout = {handleLogout}
                            loggedIn={isLoggedIn}
                            search={searchAllMovies}
                            movies={allMovies}
                            filtredMovies={searchResult}
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
                        <SavedMovies
                            logout = {handleLogout}
                            loggedIn={isLoggedIn}
                            search={searchAllMovies}
                            movies={favMoviesCards}
                            filtredMovies={searchResult}
                            favMovies={favMoviesCards}
                            addMovieToFav={addMovieToFavorite}
                            removeMovieFromFav={removeMovieFromFavorite}
                            getFavMovies={getFavMovies}
                        />
                    </ProtectedRoute>
                    <ProtectedRoute
                        path="/profile"
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <Profile
                            logout = {handleLogout}
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
