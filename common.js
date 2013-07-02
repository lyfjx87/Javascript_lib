//过滤
var Filter = {
		isExistsMail : function(email, callback) {
			var send_data = {};
			send_data['mail'] = email;
			if (callback != null && callback != undefined) {
				send_data['callback'] = callback;
			}
			$.getJSON('/api/index/m/regist.isExistMail?jsoncallback=?', send_data , function(data) {
               var fun = data.callback;
               eval("var _fun = " +  fun);
               _fun(data.data);
            });
        },
		
        isExistsName:function(name, callback){
        	var send_data = {};
			send_data['username'] = name;
			if (callback != null && callback != undefined) {
				send_data['callback'] = callback;
			}
        	$.getJSON('/api/index/m/regist.isExistUsername?jsoncallback=?', send_data, function(data) {
                var fun = data.callback;
                eval("var _fun = " +  fun);
                _fun(data.data);
            });
        },
		
	notFilterArea:['香港','澳门','台湾'],	
    //邮箱
    isEmail : function(str) {
        if (str.length == 0) {
            return false;
        }
        var reg = /^[a-z\d]([a-z\d_\-\.]*)@([a-z\d][a-z\d\-\_]*)?(([a-z\d][a-z\d\-]*)\.)+([a-z]{2,4}(\.[a-z]{2})?)$/i;
        return reg.test(str);
    },
    //用户名称
    isUsername : function(str) {
    	var len = str.length; 
        if (len < 3 ||  len > 15) {
            return false;
        }
        var reg = /^([a-zA-Z0-9_-]+$)/gi;
        return reg.test(str);
    },
    //手机号码
    isCellphoneNumber : function(number) {
        var reg = /(^0?(13[0-9]|15[0-35-9]|18[012356789]|14[57])[0-9]{8}$)/;
        return reg.test(number);
    },
    //固话电话
    isTelphoeNumber : function(number) {
        var reg = /(^((0[1,2]{1}\d{1}-?\d{8})|(0[3-9]{1}\d{2}-?\d{7,8}))$)/;
        return reg.test(number);
    },
    //不存在非汉语字符
    nonChinese : function(str) {
        var reg = /[^\u4E00-\u9FA5]/g;
        return !reg.test(str);
    },
    isChineseName : function(name) {
        var reg = /([\u4E00-\u9FA5]){2,10}/g;
        return reg.test(name);
    },
    isZipCode : function(code) {
        var reg = /^[0-9]{1}[0-9]{5}$/;
        return reg.test(code);
    },
    isLeapYear : function(year) {
        return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
    }
};
//获取cookie
function getCookie(CookieName) {
	var CookieVal = '';
    if(document.cookie) {
   	    var arr = document.cookie.split((decodeURIComponent(CookieName) + '=')); 
   	    if(arr.length >= 2)
   	    {
       	    var arr2 = arr[1].split(';');
   		    CookieVal  = decodeURIComponent(arr2[0]); //unescape() : Decodes the String
   	    }
    }
    return CookieVal;
}

function setCookie(c_name,value,expiredays, path, domain){
	document.cookie = encodeURIComponent(c_name) + "=" +
		encodeURIComponent(value) +
		((expiresec==null) ? "; " : "; max-age="+ expiresec ) +
		'path=' + path + "; " + 'domain='+domain;
}