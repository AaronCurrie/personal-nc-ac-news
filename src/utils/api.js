import axios from 'axios';

const api = axios.create({
    baseURL: "https://ac-nc-news-server.herokuapp.com/api"
})

export function getAllArticles(limit=9, topic, page=1, sort_by='created_at', order='DESC') {
    let path = '/articles?'

    limit? path += `limit=${limit}` : path += `limit=10`;
    page? path += `&p=${page}`: path += `&p=1`
    topic? path += `&topic=${topic}` : path += '';
    sort_by? path += `&sort_by=${sort_by}` : path += '';
    order? path += `&order=${order}` : path += '';

    return api.get(path).then(({data}) => {
        return data;
    })
}    

export function getAllTopics() {
    return api.get('/topics').then(({data}) => {
        return data;
    })
}

export function getArticleById(id) {
    return api.get(`/articles/${id}`).then(({data}) => {
        return data;
    })
}

export function getUsers() {
    return api.get(`/users`).then(({data}) => {
        return data;
    })
}

export function getUserByUserName(username) {
    return api.get(`/users/${username}`).then(({data}) => {
        return data;
    })
}

export function getArticleComments(id, limit=4) {
    return api.get(`/articles/${id}/comments?limit=${limit}`).then(({data}) => {
        return data;
    })
}

export function patchArticleVotes(id, upDown) {
    return api.patch(`/articles/${id}`, upDown==='up'? {"inc_votes": 1} : {"inc_votes": -1}).then(({data}) => {
        return data;
    })
}

export function patchCommentVotes(id, upDown) {
    return api.patch(`/comments/${id}`, upDown==='up'? {"inc_votes": 1} : {"inc_votes": -1}).then(({data}) => {
        return data;
    })
}

export function postNewComment(id, body, username) {
    return api.post(`/articles/${id}/comment`, {"username": username, "body": body}).then(({data}) => {
        return data
    })
} 

export function deleteComment(id) {
    return api.delete(`/comments/${id}`).then(data => {
        return data.status
    })
}