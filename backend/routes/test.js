var express = require('express');
var router = express.Router();

var sha = require('../utils/degist.js');
var getCookieValue = require('../utils/cookie.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

/* 获取我的信息界面 */
router.get('/', function (request, response, next) {
  response.render('personal/personalInfo');
});
/* 获取我的信息的API */
router.get('/:api', function (request, response, next) {
  var userId = getCookieValue(request, 'userId');
  const operator = request.params.api;
  console.log('this operator api is ' + operator);
  if (userId) {
    //更新数据
    if (operator == 'api') {
      mysqlClientInstance.exec('SELECT * FROM thesis_st_user WHERE st_code = ?', [userId], function (err, rows, fieds) {
        if (err) {
          console.log(err.stack);
          var error = {
            code: 1,
            message: '服务器异常'
          };
          response.send(error);
        } else {
          console.log('mysqlClinet.exec() success');

          var data;
          if (rows && rows.length > 0) {
            data = rows[0];
          } else {
            data = {};
          }
          var success = {
            code: 0,
            message: '成功',
            data: data
          };
          response.send(success);
        }
      });
    }
    //更改密码
    else if (operator == 'change') {
      var formData = request.body;    
      console.log("formData = " + formData);
      console.log("oldPassword = " +formData.oldPassword );
      console.log("newPassword = " + formData.newPassword, 'email =' + formData.email);
    }

  } else {
    var error = {
      code: 4,
      message: '请重新登陆'
    };
    response.send(error);
  }
});


/* 修改密码. */
router.post('/?', function (request, response, next) {
  var userId = getCookieValue(request, 'userId');
  if (userId) {
    var formData = request.query;    
    console.log("formData = " + formData);
    console.log("oldPassword = " +parseFloat(formData.oldPassword) );
    console.log("newPassword = " + formData.newPassword, 'email =' + formData.email);

    // var oldPassword_md5 = sha('md5', formData.oldPassword);
    // console.log("oldPassword_md5 = " + oldPassword_md5);

    // mysqlClientInstance.exec('SELECT st_code, st_password FROM thesis_st_user WHERE st_code=? AND password=?', [userId, oldPassword_md5], function (err, rows, fieds) {
    //   if (err) {
    //     console.log(err.stack);
    //     var error = {
    //       code: 3,
    //       message: '服务端异常'
    //     };
    //     response.send(error);
    //   } else {
    //     console.log('SELECT st_code, st_password FROM thesis_st_user WHERE st_code=? AND password=? success');
    //     if (rows.length == 0) {
    //       var error = {
    //         code: 2,
    //         message: '您的旧密码错误'
    //       };
    //       response.send(error);
    //     } else {
    //       var newPassword_md5 = sha('md5', formData.newPassword);
    //       mysqlClientInstance.exec('UPDATE thesis_st_user SET st_password = ? WHERE st_code=? AND st_password=?', [newPassword_md5, userId, oldPassword_md5], function (err, rows, fieds) {
    //         if (err) {
    //           console.log(err.stack);
    //           var error = {
    //             code: 3,
    //             message: '服务端异常'
    //           };

    //           response.send(error);
    //         } else {
    //           console.log('UPDATE thesis_st_user SET st_password = ? WHERE st_code=? AND st_password=? success');
    //           var success = {
    //             code: 0,
    //             message: '密码修改成功'
    //           };

    //           response.send(success);
    //         }
    //       });
    //     }
    //   }
    // });
  } else {
    var error = {
      code: 4,
      message: '请重新登陆'
    };
    response.send(error);
  }
});

module.exports = router;
