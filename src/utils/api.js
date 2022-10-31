import axios from 'axios';

const api = axios.create({
    baseURL: "https://ac-nc-news-server.herokuapp.com/api"
})

export function getAllArticles(limit, topic, page) {
    let path = '/articles?'

    limit? path += `limit=${limit}` : path += `limit=10`;
    page? path += `&p=${page}`: path += `&p=1`
    topic? path += `&topic=${topic}` : path += '';

    return api.get(path).then(({data}) => {
        return data;
    })
}    

export function getAllTopics() {
    return api.get('/topics').then(({data}) => {
        return data;
    })
}