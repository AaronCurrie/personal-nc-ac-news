
export function formatDate(dateStr) {
    const created = new Date(dateStr.replace(" ", "T")).toString().slice(0,28)
    return created
}