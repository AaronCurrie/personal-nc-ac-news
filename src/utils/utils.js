
export function formatDate(dateStr) {
    const created = new Date(dateStr.replace(" ", "T")).toString().slice(0,28)
    return created
}

export function buildSearchString(searchObj) {
    let string = '?';
    for(let key in searchObj) {
        string += `${key}=${searchObj[key]}`
    }
    return string
}