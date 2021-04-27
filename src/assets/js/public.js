//相减得到秒数
export function getSecondByDateSub(begin,end) {
    let beginDate  = new Date(begin);
    let endDate = new Date(end);
    let diff = endDate.getTime() - beginDate.getTime();
    let sec = diff /1000;
    return  sec ;
}

//判断是ios还是安卓
export function appSource() {
	const u = navigator.userAgent;
	const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (isiOS) {
		return "ios";
	} else {
		return "andriod";
	}
}