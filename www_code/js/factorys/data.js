//数据存贮
'use strict';

app.factory('data', ['$cordovaNetwork', '$window', 'msg', 'util', 'config', function($cordovaNetwork, $window, msg, util, config) {
	var data = {
		//存字符串数据
		set: function(key, value) { $window.localStorage[key] = value; },
		//取字符串数据
		get: function(key, defaultValue) { return $window.localStorage[key] || defaultValue; },
		//存对象数据
		setObject: function(key, value) { $window.localStorage[key] = JSON.stringify(value); },
		//取对象数据
		getObject: function(key) { return $window.localStorage[key] && ($window.localStorage[key].indexOf('{') == 0 || $window.localStorage[key].indexOf('[') == 0) ? JSON.parse($window.localStorage[key]) : {}; },
		//删除数据
		remove: function(key) { $window.localStorage.removeItem(key); },
		//清空数据
		clear: function() { $window.localStorage.clear(); }
	};
	util.extend(data, {
		//刷新所有数据
		refreshAll: function(){
			config.refresh.joke = true;
			config.refresh.meitu = true;
			config.refresh.like = true;
		},
		//验证api数据
		checkApi: function(p, success, error, fina) {
			if ((navigator.connection && navigator.connection.type == 'none')||(window.cordova && $cordovaNetwork.isOffline())) {
				msg.text('请连接网络！', 3);
				return false;
			};
			p.success(function(res) {
				console.log('success--------------------------------------------------------');
				console.log(p.$$state.value.config.url);
				console.log(p.$$state.value.config.params);
				console.log(res);
				if (res.ret && res.msg) {
					if (error) error();
					msg.alert(res.msg);
				}
				if (res.ret == 0 && success) success(res);
			}).error(function(err, status){
				console.log('error--------------------------------------------------------');
				console.log('status:', status);
				console.log(p.$$state.value.config.url);
				console.log(p.$$state.value.config.params);
				console.log(err);
				if (error) error(err, status);
				var flag = false, url = p.$$state.value.config.url;
				if (url.indexOf('/app/messages') == -1) flag = true;
				if (url.indexOf('/app/like_doctor') == -1) flag = true;
				if (url.indexOf('/app/newsLike') == -1) flag = true;
				if (flag) msg.text('请检查网络连接！', 1);
			});
			if (fina) p.finally(fina);
		}
	});
	return data;
}]);
