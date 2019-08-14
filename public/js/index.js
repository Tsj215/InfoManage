$(function () {
    const condition = [];

    $('.categoryDeletes').click(() => {

        $('.categoryCheck input:checked:checked').map(((index, item) => {
            const id = item.value.replace(/"/g, '')
            condition.push(id)
        }))
        const newCondition = Array.from(new Set(condition))

        const url = 'http://127.0.0.1:5000/category/deletes'
        console.log({...condition})
        const promise = $.ajax({
            url: url,
            method: 'POST',
            data: {...newCondition}
        })
        promise.done(window.location.reload())
    })
})
