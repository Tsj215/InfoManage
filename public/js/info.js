$(function () {

    const infoID = []

    $('#info-manage .selectCategory-1 li a').click((e) => {
        $('#info-manage .btn-group button:first-child').text(e.target.text)
    })

    $('#info-manage .selectCategory-2 li a').click((e) => {
        $('#info-manage .btn-group .droupList').text(e.target.text)
        $('#info-manage .selectCategory-2 input[type=hidden]').val(e.target.text)
    })


    $('.infoDeletes').click(() => {

        $('#info-manage .infoCheck input:checked:checked').map((index,item) => {
            const id = item.value.replace(/"/g,'')
            infoID.push(id)
        })

        const url = 'http://127.0.0.1:5000/info/deletes'
        const promise = $.ajax({
            url: url,
            method: 'POST',
            data: {...infoID}
        })
        promise.done(window.location.reload())
    })
})