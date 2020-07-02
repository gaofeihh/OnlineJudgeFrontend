export const getStorage = function(key) {
    return window.sessionStorage.getItem(key)
}

export const setStorage = function (key, value) {
    window.sessionStorage.setItem(key, value)
}
export const storageClear = function () {
    window.sessionStorage.clear()
}
