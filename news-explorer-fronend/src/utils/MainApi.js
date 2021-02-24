import { setToken, getToken } from './token.js';

class MainApi {
    constructor({baseURL, headers}) { 
        this.baseURL = baseURL;
        this.headers = headers;
    }

    register(email, name, password) {
        return fetch(`${this.baseURL}/signup`, {
            method: 'POST',
            headers: {
                ...this.headers
            },
            body: JSON.stringify({ email, password, name })
        })
        .then((res) => {
            return res.json();
        })
    }

    authorize(email, password) {
        return fetch(`${this.baseURL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => {
            return res.json();
        });
    }

    getContent(token) {
        return fetch(`${this.baseURL}/users/me`, {
            methid: 'GET',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    saveNewsCard(cardInfo, keyWord, token) {
        let word = keyWord;

        if (keyWord.current != null) {
            if (keyWord.current != '') {
                if (keyWord.current != undefined) {
                    word = keyWord.current;
                } else {
                    word = keyWord;
                }
            } else {
                word = keyWord;
            }
        } else {
            word = keyWord;
        }

        return fetch(`${this.baseURL}/articles`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                keyword: word,
                title: cardInfo.title,
                text: cardInfo.text,
                date: cardInfo.date,
                source: cardInfo.source,
                link: cardInfo.link,
                image: cardInfo.image
            })
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getCards(token) {
        return fetch(`${this.baseURL}/articles`, {
            method: 'GET',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(id) {
        return fetch(`${this.baseURL}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${getToken()}`
            }
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}

export const mainApi = new MainApi({
    baseURL: `http://api.newsarticle.students.nomoreparties.space`,
    headers: {
        'Content-Type': 'application/json'
    }
})
