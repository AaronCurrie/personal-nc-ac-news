


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

