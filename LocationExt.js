(function(location){
    var search = location.search.substr(1);
    var query = new Array();
    if (search.length != 0) {
        var tmp = search.split('&');
        var length = tmp.length;
        for(var i=0; i < length; i++){
            var field = tmp[i].split('=');
            if (field.length != 2) {
                continue;
            }
            query[field[0]] = field[1];
        }
    }
    location.query = query;    
    location.setQuery = function(k, v){
        this.query[k] = v;
    };
    location.unsetQuery = function(k){
        delete this.query[k];
    };
    location.queryString = function(){
        var tmp = new Array();
        for (var k in this.query) {
            var v = this.query[k];
            if (v === '' || v === undefined || v === null) {
                continue;
            }
            tmp.push( k + '=' + this.query[k] );
        }
        if (tmp.length==0) {
            return '';
        } else {
            return tmp.join('&');
        }
    };

    return location;
})(location);