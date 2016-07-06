(function(cookie){
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
	return cookie;
})(document.cookie);