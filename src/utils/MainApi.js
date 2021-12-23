const baseUrl = 'https://api.sidwonder.diploma.nomoredomains.rocks';
// const baseUrl = "http://localhost:3000";

class MainApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
        this._token = localStorage.getItem("token");
        this._headers =   {
            Accept: 'application/json',
                'Content-Type': 'application/json',
        };
        this._headersAuth = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._token}`,
        };
    }

    setToken(token) {
        this._token = token;
    }

    createUser(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ name, password, email }),
        })
            .then((res) => res)
            .catch((err) => console.log(err));
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
            .then((response) => response)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else if (data.status === 400) {
                    throw new Error('не передано одно из полей');
                } else if (data.status === 401) {
                    throw new Error('пользователь с email не найден');
                } else {
                    throw new Error('что-то пошло не так');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers:  this._headersAuth,
            credentials: "include",
        })
            .then((response) => response)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error(
                        "Токен не передан или передан не в том формате"
                    );
                } else if (res.status === 400) {
                    throw new Error("Переданный токен некорректен");
                } else {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    editUserData({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headersAuth,
            credentials: "include",
            body: JSON.stringify({ name, email }),
        })
            .then((response) => response)
            .catch((err) => console.log(err));
    }

    getFavMovies(){
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: this._headersAuth,
            credentials: "include",
        })
            .then((response) => response.json())
            .catch((e) => console.log(e));
    }
    addToFav(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headersAuth,
            credentials: "include",
            body: JSON.stringify({
                movieId: movie.id,
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error(`${response.status}`));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    removeFromFav(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: this._headersAuth,
            credentials: "include",
        });
    }
}

const mainApi = new MainApi({baseUrl});
export default mainApi;