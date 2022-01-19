const baseUrl = 'https://api.sidwonder.diploma.nomoredomains.rocks';
// const baseUrl = "http://localhost:3000";

class MainApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
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
        console.log(this._token)

        return this._token = token;
    }

    _handleOriginalResponse(res) {
      if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
  }

    createUser(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, password, email }),
        }).then(this._handleOriginalResponse)
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
        .then(this._handleOriginalResponse)
            // .then((response) => response)
            // .then((data) => {
            //     if (data.ok) {
            //         return data.json();
            //     } else if (data.status === 400) {
            //         throw new Error('не передано одно из полей');
            //     } else if (data.status === 401) {
            //         throw new Error('пользователь с email не найден');
            //     } else {
            //         throw new Error('что-то пошло не так');
            //     }
            // })
            // .catch((err) => {
            //     console.log(err);
            // });
    }

    getUserData(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        })
        .then(this._handleOriginalResponse)
            // .then((res) => {
            //     if (res.status === 401) {
            //         throw new Error(
            //             "Токен не передан или передан не в том формате"
            //         );
            //     } else if (res.status === 400) {
            //         throw new Error("Переданный токен некорректен");
            //     } else {
            //         return res.json();
            //     }
            // })
            // .catch((err) => {
            //     console.log(err);
            // });
    }

    editUserData({ name, email }, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ name, email }),
        })
        .then(this._handleOriginalResponse)
    }

    getFavMovies(token){
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        })
        .then(this._handleOriginalResponse)
    }
    addToFav(movie, token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
                movieId: movie.id,
                country: movie.country || 'unknown',
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN || 'unknown',
            }),
        })
        .then(this._handleOriginalResponse)
    }

    removeFromFav(id, token) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers:  {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        }).then(this._handleOriginalResponse)
    }
}

const mainApi = new MainApi({baseUrl});
export default mainApi;
