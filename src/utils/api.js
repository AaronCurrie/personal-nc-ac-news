import axios from 'axios';

const api = axios.create({
    baseURL: "https://ac-nc-news-server.herokuapp.com/api"
})

export function getAllArticles() {
    let path = '/articles'

    return api.get(path).then(({data}) => {
        return data.articles;
    })
}    