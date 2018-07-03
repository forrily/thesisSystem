var express = require('express');
var router = express.Router();
// 引入数据库包
var getCookieValue = require('../utils/cookie.js');
var sha = require('../utils/degist.js');
var common = require('../utils/common.js');
var Map = require('../utils/Map.js');
var mysql = require('mysql')
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();
var loginMap = new Map();

const querdata = function (request, response, next) {
  var userId = getCookieValue(request, 'userId');
  if (userId) {
    mysqlClientInstance.exec('SELECT * FROM thesis_st_user WHERE st_code = ?', [userId], function (err, rows, fieds) {
      if (err) {
        console.log(err.stack);
        let error = {
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
    });//查询用户数据库

  } else {
    let error = {
      code: 4,
      message: '请重新登陆'
    };
    response.send(error);
  }
}


class common {
  constructor(props) {
    const instance = this;
    this.querdata = querdata.bind(instance);
  }
}
module.exports = common;