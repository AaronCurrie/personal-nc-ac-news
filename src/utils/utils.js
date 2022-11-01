import football from '../Images/football.jpg';
import cooking from '../Images/cooking.jpg';
import coding from '../Images/coding.jpg';
import defaultImg from '../Images/default.jpg';

export function formatDate(dateStr) {
    const created = new Date(dateStr.replace(" ", "T"))
    const date = created.toUTCString()
    return date
}

export function buildSearchString(searchObj) {
    let string = '?';
    for(let key in searchObj) {
        string += `${key}=${searchObj[key]}`
    }
    return string
}

export function imageSelctor(topic) {
    switch (topic) {
        case 'football':
            return football;
        case 'coding':
            return coding;
        case 'cooking':
            return cooking;
        default:
            return defaultImg;
    }
}