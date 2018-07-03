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

//task
const task = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('paperManagement/task');
  }
  else {
    response.redirect('/login');
  }
}
//开题报告
const openingReport = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('paperManagement/openingReport');
  }
  else {
    response.redirect('/login');
  }
}
//中期检查
const midInspection = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('paperManagement/midInspection');
  }
  else {
    response.redirect('/login');
  }
}
//论文查重
const paperReview = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('paperManagement/paperReview');
  }
  else {
    response.redirect('/login');
  }
}
//论文提交
const paperSubmit = function (request, response, next) {
  const userId = getCookieValue(request, 'userId');
  if (userId) {
    response.render('paperManagement/paperSubmit');
  }
  else {
    response.redirect('/login');
  }
}

class paperManagement {
  constructor(props) {
    const instance = this;
    this.task = task.bind(instance);
    this.openingReport = openingReport.bind(instance);
    this.midInspection = midInspection.bind(instance);
    this.paperReview = paperReview.bind(instance);
    this.paperSubmit = paperSubmit.bind(instance);
  }
}
module.exports = paperManagement;