/**
 * cookie
 */
function Cookie(){
	this.get = function(k)
	{
		var v = '';
		if(document.cookie) {
			var arr = document.cookie.split((decodeURIComponent(k) + '=')); 
			if(arr.length >= 2)
			{
				var arr2 = arr[1].split(';');
				v  = decodeURIComponent(arr2[0]);
			}
		}
		return v;
	};
	this.set = function(k,v,expiresec, path, domain)
	{
	    var date = new Date();
	    expiresec = parseInt(expiresec);
	    date.setTime(date.getTime() + (expiresec*1000));
		document.cookie = encodeURIComponent(k) + "=" +
		encodeURIComponent(v) +
		((expiresec==null) ? "; " : "; expires="+ date.toUTCString()) +
		'path=' + path + "; " + 'domain='+domain;
	};
	return this;
}
