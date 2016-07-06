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