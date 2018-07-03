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


// 所有选题
const allSelect = function (request, response, next) {
  // response.render( 'selectManagement/allElective' );
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    mysqlClientInstance.exec('SELECT * FROM thesis_all_thesis', null, function (err, rows, fieds) {
      if (err) {
        common.handleError(err, request);
      } else {
        console.log('SELECT * FROM thesis_all_thesis limit 0, 100 success');
        response.render('selectManagement/allElective', { 'rows': rows });
      }
    });
  } else {
    response.redirect('/login');
  }
}
//我的选题
const myElective = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    mysqlClientInstance.exec('SELECT * FROM thesis_st_user,thesis_all_thesis where thesis_st_user.paper_id=thesis_all_thesis.paper_id ', null, function (err, rows, fieds) {
      if (err) {
        common.handleError(err, request);
      }
      else {
        console.log('SELECT * FROM thesis_st_user right join thesis_all_thesis on thesis_st_user.paper_id=thesis_all_thesis.paper_id ');
        response.render('selectManagement/myElective', { 'rows': rows });
        console.log(rows);
      }
    
    });
}
}
//已选课题
const selectedElective = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    mysqlClientInstance.exec('SELECT * FROM thesis_all_thesis ', null, function (err, rows, fieds) {
      if (err) {
        common.handleError(err, request);
      } else {
        console.log('SELECT * FROM thesis_all_thesis success');
        response.render('selectManagement/selectedElective', { 'rows': rows });
      }
    });
  }
}
//未选课题
const unSelectedElective = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    mysqlClientInstance.exec('SELECT * FROM thesis_all_thesis ', null, function (err, rows, fieds) {
      if (err) {
        common.handleError(err, request);
      } else {
        console.log('SELECT * FROM thesis_all_thesis success');
        response.render('selectManagement/unSelectedElective', { 'rows': rows });
      }
    });
  }
}
//选题操作
const zxc = function (request, response, next) {
  console.log("-----------------------------");
  console.log(request.query.id);
  mysqlClientInstance.exec('UPDATE  thesis_all_thesis SET paper_num=paper_num-1 WHERE paper_id = ' + request.query.id, null, function (err, rows, fieds) {
    if (err) {
      common.handleError(err, request);

    } else {

      console.log('UPDATE  thesis_all_thesis SET paper_num=paper_num-1 WHERE paper_id =');
      mysqlClientInstance.exec('UPDATE  `thesis_st_user` SET `paper_id`= ? WHERE st_code = ?', [request.query.id, getCookieValue(request, "userId")], function (err, rows, fieds) {
        if (err) {
          common.handleError(err, request);
        } else {
          console.log('UPDATE  `thesis_st_user` SET `paper_id`  =' + request.query.id + 'WHERE st_code = ?');
        }
      });
      var success = {
        code: 0,
        message: '成功',
        data: 1
      };
      response.send(success);
    }
  });
}

class selectManagement {
  constructor(props) {
    const instance = this;
    this.allSelect = allSelect.bind(instance);
    this.myElective = myElective.bind(instance);
    this.selectedElective = selectedElective.bind(instance);
    this.unSelectedElective = unSelectedElective.bind(instance);
    this.zxc = zxc.bind(instance);
  }
}
module.exports = selectManagement;