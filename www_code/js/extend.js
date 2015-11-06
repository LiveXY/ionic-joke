//扩展方法
'use strict';

//去前后空格
String.prototype.trim = function() {
	var text = this.replace(/^\s\s*/, ''), ws = /\s/, i = this.length;
	while (ws.test(text.charAt(--i)));
	return text.slice(0, i + 1);
}
//字符串格式化
String.prototype.format = function () { var args = arguments; return this.replace(/{(\d+)}/g, function () { return args[arguments[1]]; }); };
//是否日期时间字符串
String.prototype.isDateTime = function() {
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
};
//是否日期字符串
String.prototype.isDate = function() {
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
};
//字符串转日期
String.prototype.toDateTime = function () {
	if (!this) return null;
	var val = this.replace(/[-]/g, "/");
	if (val.isDate() || val.isDateTime()) return new Date(Date.parse(val));
	var r = this.match(/(\d+)/);
	if (r) return new Date(parseInt(r)*1000);
	return new Date(val);
};
//是否Email地址
String.prototype.isEmail = function() {
	return this.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ig);
};
//是否手机号
String.prototype.isMobile = function() {
	return this.match(/^(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/ig);
};
//日期格式化
Date.prototype.format = function (fmt) { //日期format參數 yyyy-MM-dd HH:mm:ss
	var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() };
	var week = { "0": "\u65e5", "1": "\u4e00", "2": "\u4e8c", "3": "\u4e09", "4": "\u56db", "5": "\u4e94", "6": "\u516d" };
	if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); };
	if (/(E+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]); };
	for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }; };
	return fmt;
};
//转unix time
Date.prototype.toUnixTime = function () { return Math.round(+this/1000); };
window.onerror = function(message) {
	console.log('error---------------------------------------------');
	console.log(message);
};
