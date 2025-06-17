
export const date = () => {
    const readable = new Date(Date.now()).toLocaleString()
    return readable
}