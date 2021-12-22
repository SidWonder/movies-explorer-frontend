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

}



const mainApi = new MainApi({baseUrl});
export default mainApi;