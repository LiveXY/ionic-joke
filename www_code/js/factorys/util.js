//工具类
'use strict';

app.factory('util', function() {
	var util = {
		//去前后空格
		trim: function(text) {
			var text = text.replace(/^\s\s*/, ''), ws = /\s/, i = text.length;
			while (ws.test(text.charAt(--i)));
			return text.slice(0, i + 1);
		},
		//右截取字符
		rtrim: function (str, char) { if (str[str.length-1] === char) return str.substr(0, str.length-1); return str; },
		//字符串格试化
		format: function() {
			if (arguments.length == 0) return '';
			if (arguments.length == 1) return arguments[0];
			var text = arguments[0];
			var args = Array.prototype.slice.call(arguments).splice(1);
			return text.replace(/{(\d+)}/g, function () { return args[arguments[1]]; });
		},
		//是否空
		empty: function(obj) {
			if (!obj) return true;
			if (util.isArray(obj) && obj.length == 0) return true;
			for (var name in obj) if(obj.hasOwnProperty(name)) return false;
			return util.isObject(obj);
		},
		//截取字符串
		sub: function (text, len, ext) {
			ext = ext || '';
			var r = /[^\x00-\xff]/g;
			if (text.replace(r, "mm").length <= len) return text;
			var m = Math.floor(len / 2);
			for (var i = m; i < text.length; i++) {
				if (text.substr(0, i).replace(r, "mm").length >= len) return text.substr(0, i) + ext;
			}
			return text;
		},
		//验证正则
		test: function (reg, str) { return (new RegExp(reg, 'i')).test(str); },
		//前导字符
		leftPad: function(nr, n, str) { return Array(n-String(nr).length+1).join(str||'0')+nr; },
		//unix time
		unixTime: function (date) { date = date || new Date(); return Math.round(+date/1000); },
		//扩展
		extend: function (defaults, options) {
			if (!options || typeof options !== 'object') return defaults;
			var keys = Object.keys(options);
			var i = keys.length;
			while (i--) defaults[keys[i]] = options[keys[i]];
			return defaults;
		},
		//是否字符串
		isString: function(obj) { return Object.prototype.toString.call(obj) === '[object String]'; },
		//是否函数
		isFunction: function(obj) { return typeof obj === 'function'; },
		//是否对像
		isObject: function(obj) { return typeof obj === 'object'; },
		//是否数组
		isArray: function(obj) { return Array.isArray(obj); },
		rand: function(from, to) { return (Math.floor(Math.random() * (to - from)) + from); },
		aes_decode: function(uid, sign, encrypted) {
			var key  = CryptoJS.enc.Utf8.parse(sign);
			var iv   = CryptoJS.enc.Utf8.parse(sign.substr(0, 16-uid.toString().length) + uid.toString());
			var decrypted = CryptoJS.AES.decrypt(encrypted,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
			return decrypted.toString(CryptoJS.enc.Utf8);
		}
	};
	return util;
});
