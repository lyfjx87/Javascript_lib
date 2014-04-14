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

//删除cookie    
function delCookie(name){
	var exp = new Date();    
	exp.setTime(exp.getTime() - 1);    
	var cval=getCookie(name);    
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/**
 * 生成分页
 * 当前页 curr_page
 * 总页数 pages
 * zldfd lie表
 */ 
function pagenations(curr_page, pages, v) {
	if (pages < 2) {
		return false;
	}

	var init_len = 3;
	var number_page = (init_len * 2) + 1;
	var tmp = {};
	for ( var i = 1; i <= number_page; i++) {
		tmp[i] = 0;
	}
	i = 1;
	if (pages <= number_page) {
		for (i; i <= pages; i++) {
			tmp[i] = i;
		}
	} else if (pages > number_page) {
		if (curr_page <= init_len + 1) {
			for (i; i <= number_page; i++) {
				tmp[i] = i;
			}
		} else {
			if (pages - curr_page <= init_len) {
				var start = pages - number_page + 1;
				var end = pages;
				for (i; i <= number_page; i++) {
					if (start > end) {
						break;
					}
					tmp[i] = start;
					start++;
				}
			} else {
				var start = curr_page - init_len;
				var end = start + (init_len * 2);
				for (i; i <= number_page; i++) {
					if (start > end) {
						break;
					}
					tmp[i] = start;
					start++;
				}
			}
		}
	}
	var n_style = 'style="font-size:14px; margin:0 5px; _display:inline;cursor:pointer;color:#666666;"';
	var html = '';
	for (i = 1; i <= number_page; i++) {
		if (tmp[i] != 0) {
			var p_style = n_style;
			if (tmp[i] == curr_page) {
				p_style = 'style="font-size:14px; margin:0 5px; _display:inline;cursor:pointer;color:#11AFDE ;font-weight:bold;"';
			}
			html += '<span class="' + v + '" ' + p_style + ' id="page_'
					+ tmp[i] + '">' + tmp[i] + '</span>';
		}
	}
	var prev = '';
	if (curr_page > 1) {
		prev = '<span class="' + v + '" id="prev" ' + n_style
				+ '>&lt;&lt;</span>';
	}
	var next = '';
	if (curr_page < pages) {
		next = '<span class="' + v + '" id="next" ' + n_style
				+ '>&gt;&gt;</span>';
	}
	html = '<tr ><td  colspan="6" bgcolor="#ffffff" align="right"><div style="padding:0 10px;">'
			+ prev + html + next + '</div></td></tr>';
	return html;
}
