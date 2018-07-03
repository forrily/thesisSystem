var express = require( 'express' );
var router = express.Router();
// 引入数据库包
var getCookieValue = require( '../utils/cookie.js' );
var mysql = require('mysql')
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();


/* GET home page. */

function indexHandler( request, response, next )
{
  var userId = getCookieValue( request, 'userId' );
  if ( userId )
  {
    mysqlClientInstance.exec('SELECT * FROM thesis_st_user,thesis_all_thesis where thesis_st_user.paper_id=thesis_all_thesis.paper_id ', null, function (err, rows, fieds) {
      if (err) {
        common.handleError(err, request);
      }
      else {
        console.log('SELECT * FROM thesis_st_user right join thesis_all_thesis on thesis_st_user.paper_id=thesis_all_thesis.paper_id ');
        response.render('index', { 'rows': rows });
        console.log(rows);
      }
    
    });
    // response.render( 'index', {});
    // next();
  } else
  {
    req.redirect( '/login' );
  }
}

/**
 * 个人中心
 */
// function personalInfo(req,res,next){
//  let userId=getCookieValue(req,'userId');
//  res.render('personal/personalInfo');
// }

router.get( '/', indexHandler );
router.get( '/index', indexHandler );

// router.get('/license',function(req,res,next){
//  res.render('license');
// });

// router.get('/personal',personalInfo);

module.exports = router;
