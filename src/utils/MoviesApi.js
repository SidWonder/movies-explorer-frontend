const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

class Api {
    constructor(url) {
        this.url = url;
    }

    getData() {
        return fetch(this.url)
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Error: ${res.status}`);
                }
                return res.json();
            });
    }
}
const MoviesApi = new Api(baseUrl);
export default MoviesApi;