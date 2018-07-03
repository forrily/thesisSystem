/**
 * 配置文件
 *
 */
var db = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'thesis_system'
};

var alidayu = {
    AppKey: 'your app key',
    AppSecret: 'your app secret',
    partner_id: 'xxxx',
    product: "xxxxx",
    sms_free_sign_name: 'xxxx',
    sms_template_code: 'SMS_sssssss',
    sms_template_code2: 'SMS_yyyyyyy'
};

module.exports.db = db;
module.exports.alidayu = alidayu;


