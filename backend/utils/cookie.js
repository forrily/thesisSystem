/**
 * 获取Cookie值
 *
 */
function getCookieValue(request, key) {
    var cookies = request.headers.cookie;
    console.log("cookies = " + cookies);

    if (cookies) {
        cookies = cookies.split(';');//分割成字符串数组
        for (var i in cookies) {
            console.log('in cookie.js:12 '+cookies[i]);
            var index = cookies[i].replace(" ", "").indexOf(key);
            console.log('index = ' + index);

            if (index > -1) {
                var kv = cookies[i].split('=');
                console.log('kv = ' + kv);
                if (kv[0] == key) {
                    console.log('in cookie.js:20 value = ' + kv[1]);
                    return kv[1];
                } else if (kv[0] == ' ' + key) {
                    console.log('value = ' + kv[1]);
                    return kv[1];
                }
            }
        }
    }

    return null;
}

module.exports = getCookieValue;