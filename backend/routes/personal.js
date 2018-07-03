var express = require('express');
var router = express.Router();
// 引入数据库包
var getCookieValue = require('../utils/cookie.js');
var common = require('../utils/common.js');
var sha = require('../utils/degist.js');
var Map = require('../utils/Map.js');
var mysql = require('mysql')
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();
var loginMap = new Map();

/**
 * 个人中心获取用户信息
 */
const personalInfo = function (request, response, next) {  
  var userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('personal/personalInfo');//查看个人信息        
    // mysqlClientInstance.exec('SELECT * FROM thesis_st_user WHERE st_code = ?', [userId], function (err, rows, fieds) {
    //   if (err) {
    //     console.log(err.stack);
    //     let error = {
    //       code: 1,
    //       message: '服务器异常'
    //     };
    //     response.send(error);
    //   } else {
    //     console.log('mysqlClinet.exec() success');
    //     var data;
    //     if (rows && rows.length > 0) {
    //       data = rows[0];
    //       console.log('this function success personal.js :37 data is' + data);
    //     } else {
    //       data = {};
    //       console.log('this function success personal.js :42 data is' + data);
    //     }
    //     var success = {
    //       code: 0,
    //       message: '成功',
    //       data: data
    //     };
    //     response.send(success);
    //     console.log('this function fail personal.js :48' + success);
    //     // response.render('personal/personalInfo', { 'data': data });

    //   }
    // });//查询用户数据库
    // // response.render('personal/:personalInfo',{'data':data});//查看个人信息    

  } else {
    let error = {
      code: 4,
      message: '请重新登陆'
    };
    response.send(error);
    // response.redirct();
  }
}

const myResults = function (request, response, next) {
  response.render('personal/myResults');
}
const help = function (request, response, next) {
  response.render('personal/help');
}

class personal {
  constructor(props) {
    const instance = this;
    this.personalInfo = personalInfo.bind(instance);
    this.myResults = myResults.bind(instance);
    this.help = help.bind(instance);
  }

}


module.exports = personal;

