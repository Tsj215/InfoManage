window.onload = function () {
    $(function () {
        $('#user-manage .user-info input[type=checkbox]').bootstrapSwitch({
            onText: '在线',
            offText: '离线',
        });

        const checked = $('#user-manage .user-info input[type=checkbox]').val()

        //获取表单数据　前台验证  发送 ajax 请求
        $('#new-user').on('submit', function (event) {
            event.preventDefault()
            // const formData = $(this).serialize()
            const formData = $(this).serializeArray()
            const password = formData[1].value
            const password2 = formData[2].value
            if (password === password2) {
                $('#new-user .password2').removeClass('has-error')
                $('#new-user .password2').removeClass('has-feedback')
                $('#new-user .password2 > span').removeClass('glyphicon-remove')

                $('#new-user .password2').addClass('has-success')
                $('#new-user .password2').addClass('has-feedback')
                $('#new-user .password2 > span').addClass('glyphicon-ok')

                $.ajax({
                    url: '/user/new',
                    type: 'post',
                    data: formData,
                    // dataType: 'json',
                    success: (data) => {
                        console.log(data)
                        const err_code = data.err_code
                        if (err_code === 0) {
                            window.location.href = '/user'
                        } else {
                            window.alert('注册失败，请稍后重试')
                        }
                    }
                })
            } else {
                $('#new-user .password2').addClass('has-error')
                $('#new-user .password2').addClass('has-feedback')
                $('#new-user .password2 > span').addClass('glyphicon-remove')
            }
        })
    })
};
