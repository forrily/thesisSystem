

$(document).ready(function () {
  // $.ajax({
  //   url: 'http://localhost:3000/personal/personalInfo/api',                //请求的url地址，这是相对于现在的位置的地址
  //   dataType: 'json',        //返回格式为json
  //   async: true,             //请求是否异步，默认为异步，这也是ajax重要特性
  //   data: null,       //参数值
  //   type: 'GET',            //请求方式
  //   success: function (response) {
  //     alert(response);
  //     $('#name').html(response.data.st_name);
  //   },//成功的回掉函数
  //   error: function (XMLHttpRequest, textStatus, errorThrown) {
  //     alert(XMLHttpRequest.status);
  //     alert(XMLHttpRequest.readyState);
  //     alert(textStatus);
  //   }     //失败的回掉函数
  // });
  asyncGet('/personal/personalInfo/api', null, function (response) {
    var errMsg = '登陆失败';
    if (response) {
      console.log("This method is successfully executed" + response);
      if (response.code == 0 && response.data) {
        $('#name').html(response.data.st_name);
        $('.description').html(response.data.st_name + "/ID：" + response.data.st_code + '/专业：' + response.data.st_profession);
        $('.username').html(response.data.st_name);
        return;
      }
      if (response.code == 4) {
        location.href = '/login';
        return;
      }
      if (response.message) {
        errMsg = response.message;
      }
    }
    showAlert(errMsg);
  });
  $('#btn-submit').click(function () {
    asyncGet('/personal/personalInfo/change', {'oldPassword':$('#oldPassword').val()}, function (response) {

    });
  });
});

