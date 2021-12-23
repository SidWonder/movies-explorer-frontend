const baseUrl = 'https://api.sidwonder.diploma.nomoredomains.rocks';
// const baseUrl = "http://localhost:3000";

class MainApi {
    constructor({baseUrl}) {
        console.log(baseUrl);
        this._baseUrl = baseUrl;
        this._headers =   {
            Accept: 'application/json',
                'Content-Type': 'application/json',
        };
        this._token = `Bearer ${localStorage.getItem("token")}`;
        this._headersAuth = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._token}`,
        };
    }

    setToken(token) {
        this._token = `Bearer ${token}`;
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
            .catch((err) => {
                console.log(err);
            });
    }

    getUserData(token) {
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

}



const mainApi = new MainApi({baseUrl});
export default mainApi;