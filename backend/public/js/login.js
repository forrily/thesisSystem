$(document).ready(function () {
    $('#loginBtn').click(function () {
        var userName = $('#username').val();
        if (!userName) {
            showAlert('请输入正确的学号或工号');
            return;
        }else if(username=""){
          showAlert("账号不能为空");
        }

        var password = $('#password').val();
        if (password) {
            if (password.length < 6) {
                showAlert('请至少输入6位密码');
                return;
            }
        } else {
            showAlert('请输入6~16位密码');
            return;
        }

        asyncPost('/login', {'username': userName, 'password': password}, function (response) {//请求成功时处理
                var errMsg = '登陆失败';
                if (response) {
                    if (response.code == 0 && response.userId) {
                      showAlert(response.code,response.userId);
                        location.href = '/index';
                        return;
                    }

                    if (response.message) {
                        errMsg = response.message;
                    }
                }

                showAlert(errMsg);
            }
        );
    });
});