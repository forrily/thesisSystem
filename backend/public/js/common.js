
/**
 * 保存
 * @param url 要保存的资源地址
 */
function saveAs(url) {
  var openedWindow = window.open(url);
  openedWindow.document.execCommand("saveAs", true, url);
}

function showAlert(message, callback) {
  parent.layer.alert(message, {
      title: '',
      closeBtn: 0,
      shift: 2 //动画类型
  }, callback);
}

function asyncGet(url, queryObject, successCallback, errorCallback) {
  if (!queryObject) {
      queryObject = {};
  }
  if (!errorCallback) {
      errorCallback = function () { //默认的请求出错处理
          showAlert('请求失败，请重试！');
      }
  }
  $.ajax({
      url: url,                //请求的url地址，这是相对于现在的位置的地址
      dataType: 'json',        //返回格式为json
      async: true,             //请求是否异步，默认为异步，这也是ajax重要特性
      data: queryObject,       //参数值
      type: 'GET',             //请求方式
      success: successCallback,//成功的回掉函数
      error: errorCallback     //失败的回掉函数
  });
}

function asyncPost(url, requestBody, successCallback, errorCallback) {
  if (!requestBody) {
      requestBody = {};
  }
  if (!errorCallback) {
      errorCallback = function () { //默认的请求出错处理
          showAlert('请求失败，请重试！');
      }
  }
  $.ajax({
      url: url,                //请求的url地址，这是相对于现在的位置的地址
      dataType: 'json',        //返回格式为json
      async: true,             //请求是否异步，默认为异步，这也是ajax重要特性
      data: requestBody,       //参数值
      type: 'POST',            //请求方式
      success: successCallback,//成功的回掉函数
      error: errorCallback     //失败的回掉函数
  });
}