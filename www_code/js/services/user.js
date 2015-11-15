//用户API接口
'use strict';

app.factory('UserService', ['$http', 'config', 'data', function($http, config, data) {
	function getPlatform(){
		var pf = ionic.Platform.isIOS() || ionic.Platform.isIPad() ? 'appstore' : null;
		if (!pf) pf = ionic.Platform.isAndroid() ? 'android' : null;
		if (!pf) pf = 'web';
		return pf;
	};

	return {
		//我喜欢的
		likes: function(page) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('likes'),
				method: "jsonp",
				params: { 'sessionKey': data.get("sessionKey"), page: page }
			});
		},
		//未读
		messages: function() {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('messages'),
				method: "jsonp",
				params: { 'sessionKey': data.get("sessionKey") }
			});
		},
		//最新版本
		version: function() {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('version'),
				method: "jsonp",
				params: { version: config.vid }
			});
		},
		//QQ登录
		qqLogin: function(userid, accessToken) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('qqLogin'),
				method: "jsonp",
				params: { 'sessionKey': data.get("sessionKey"), userid: userid, accessToken: accessToken, bundleid: config.bundleid, platform: getPlatform() }
			});
		},
		//微信登录
		wechatLogin: function(code) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('wechatLogin'),
				method: "jsonp",
				params: { 'sessionKey': data.get("sessionKey"), code: code, bundleid: config.bundleid, platform: getPlatform() }
			});
		},
		//登录并注册
		auth: function() {
			var pf = getPlatform();
			var user = data.getObject('user');

			var uuid = user && user.username ? user.username : (window['device'] && device.uuid ? device.uuid : 'test1');
			var network = navigator.connection && navigator.connection.type ? navigator.connection.type : 'none';
			console.log(user.uid, uuid, network, pf, config.bundleid, config.vid, config.vname);
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('auth'),
				method: 'jsonp',
				params: { platform: pf, uuid: uuid, locale: 'zh_CN', bundleid: config.bundleid, ver: config.vname, vid: config.vid, network: network }
			});
		},
		logout: function() {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('logout'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey') }
			});
		},
		//反馈
		feedback: function(text) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('feedback'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), text: text }
			});
		},
		//投稿
		upload: function(text) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('upload'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), text: text }
			});
		}
	};
}]);
