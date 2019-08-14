/*
ajax封装
 */
// const baseUrl = 'http://134.175.154.93:8099/'

function getAjax(url, method, data, success, error) {
    var promise = $.ajax({
        url: baseUrl + url,
        method: method,
        data: data,
    })
    promise.then(success)
    promise.catch(error)
}
