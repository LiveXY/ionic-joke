//初始化接口
'use strict';

app.factory('init', ['$http', '$location', '$ionicHistory', '$rootScope', '$ionicModal', '$timeout', '$interval', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$q', 'data', 'util', 'config', 'UserService', 'JokeService', 'msg', 'MeituService', 'jpush', function($http, $location, $ionicHistory, $rootScope, $ionicModal, $timeout, $interval, $ionicSlideBoxDelegate, $ionicScrollDelegate, $q, data, util, config, UserService, JokeService, msg, MeituService, jpush) {

	var init = {
		//新用户设置JPush标签和别名
		setJPushTagsAndAliasByNewUser: function() {
			var user = data.getObject('user');
			var pf = config.bundleid.split('-');
			var tags = [config.vname];
			if (user && user.newuser==1) {
				if (pf.length == 2) tags.push(pf[1]);
				jpush.setTagsWithAlias(tags, user.uid);
			}
		},
		//设置JPush标签和别名
		setJPushTagsAndAlias: function() {
			var user = data.getObject('user');
			var pf = config.bundleid.split('-');
			var tags = [config.vname];
			if (user) {
				if (pf.length == 2) tags.push(pf[1]);
				jpush.setTagsWithAlias(tags, user.uid);
			}
		},
		//退出清理数据
		logout: function() {
			var oldKey = data.get('oldKey');
			data.remove("user");
			data.remove('sessionKey');
			data.clear();
			data.set('oldKey', oldKey);
			data.set('sessionKey', oldKey);
			var user = data.getObject('user');
			if (user) user.login = 0;
			data.setObject('user', user);
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			data.checkApi(UserService.logout(), function(res){  });
		},
		//启动授权
		auth: function(uuid) {
			var d = $q.defer();
			data.checkApi(UserService.auth(uuid), function(res){
				config.switch = res.switch;
				var user = data.getObject('user');
				data.set('sessionKey', res.sessionKey);
				data.set('oldKey', res.sessionKey);
				if (user && user.login) res.user.login = user.login;
				data.setObject('user', res.user);
				d.resolve(res.user);
			}, function() { init.logout(); });
			return d.promise;
		},
		//注册常用函数
		registerBase: function($scope) {
			//跳转页面
			$scope.go = function(path) { $location.path(path); };
			//滚动到顶部
			$scope.scrollTop = function() { $timeout(function(){ $ionicScrollDelegate.scrollTop(true); }); };
			//后退
			$scope.goBack = function() { $ionicHistory.goBack(); };
			//当前用户
			$scope.currUser = function() { return data.getObject('user'); };
		}
	};
	return init;
}]);
