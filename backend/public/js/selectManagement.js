function xt(a) {
  let id = a;
  asyncGet('/selectManagement/zxc', { "id": id }, function (response) {
    var errMsg = '登陆失败';
    if (response) {
      console.log("This method is successfully executed" + response);
      if (response.code == 0 && response.data) {
        showAlert('选择成功', function () {
          window.location.reload();
        });
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
  return;
}

$(document).ready(function () {
  // 查看详情按钮
  $('.seeDetails').click(function () {
    var box = 300;
    var th = $(window).scrollTop() + $(window).height() / 1.6 - box;
    var h = document.body.clientHeight;
    var rw = $(window).width() / 2 - box;
    $(".showbox").animate({ top: th, opacity: 'show', width: 600, height: 340, right: rw }, 500);
    $("#zhezhao").css({
      display: "block", height: $(document).height()
    });
    return false;
  });
  $(".showbox .close").click(function () {
    $(this).parents(".showbox").animate({ top: 0, opacity: 'hide', width: 0, height: 0, right: 0 }, 500);
    $("#zhezhao").css("display", "none");
  });

  //选择课题按钮
  asyncGET('selectManegement/myElective', null, function (response) {
    var errMsg = '登陆失败';
    if (response) {
      console.log('this method is successfully executed' + response);
      if (response.rows) {
        $('.elective-title').html(response.rows.paper_topic)
      }
    }
  })


})