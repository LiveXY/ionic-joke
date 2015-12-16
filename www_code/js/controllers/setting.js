//设置控制器
'use strict';

//我的
app.controller('settingController', ['$timeout', '$scope', '$rootScope', 'init', 'data', 'config', 'login', 'share', function($timeout, $scope, $rootScope, init, data, config, login, share) {
	init.registerBase($scope);

	$rootScope.fontSize = data.get('fontSize') || '16';
	$rootScope.openNight = data.get('openNight') == 'true' ? true : false;

	$scope.$on('$ionicView.afterEnter', function() {
		$rootScope.fontSize = data.get('fontSize') || '16';
		$rootScope.openNight = data.get('openNight') == 'true' ? true : false;
		if(window.cordova && window.cordova.plugins.Keyboard)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
	});

	$scope.goStore = function() {
		var url = '';
		if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) url = 'itms-apps://itunes.apple.com/us/app/dared/id1059711002?ls=1&mt=8';
		if (ionic.Platform.isAndroid()) url = 'market://details?id='+config.bundleid.split('-')[0];
		if (url) window.open(url, '_system');
	}
	$scope.goUpdate = function() {
		$rootScope.updateBack = true;
		$scope.go('/version');
	}
	$scope.saveSetting = function(key, value){
		data.set(key, value);
		$rootScope[key] = value;
		if (key == 'openNight') {
			var skin = value ? 'dark' : 'assertive'
			data.set('skin', skin);
			$timeout(function(){
				$rootScope.skin = skin;
				if (skin == 'assertive') {
					//if(window.StatusBar) StatusBar.styleLightContent();
					angular.element(document.querySelector("ion-header-bar")).removeClass('bar-dark').addClass('bar-assertive');
				} else {
					//if(window.StatusBar) StatusBar.styleDefault();
				}
			});
		}
	}
	$scope.showShareButton = false; //login.wechatIsInstalled() || login.qqIsInstalled();
	$scope.showShare = function(){
		var url = config.api.split('?')[0].format('down');
		var list = url.split('/'); list.splice(3,2);
		var ico = list.join('/') + '/client/images/80.png';
		share.pop('猪猪笑话－搞笑段子、短信', '猪猪笑话精选大量最新笑话，汇集互联网上各类新鲜流行的笑话段子，提供大量经典笑话、幽默笑话、成人笑话、爆笑笑话、冷笑话等，让你每天笑一笑，学习工作没烦恼，能给您带来轻松快乐的心情。', ico, url, function(){
			data.checkApi(NewsService.newsShare($stateParams.id), function(res) {
				$scope.info.shares = res.shares;
			});
		});
	}
}])
//我要反馈
.controller('feedbackController', ['$scope', 'init', 'data', 'msg', 'UserService', function($scope, init, data, msg, UserService) {

	if(window.cordova && window.cordova.plugins.Keyboard)
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

	init.registerBase($scope);
	$scope.data = {};
	$scope.postFeedback = function(){
		if (!$scope.data.message) return msg.text('请输入您的反馈意见！', 1);
		data.checkApi(UserService.feedback($scope.data.message), function(res){
			$scope.goBack();
			msg.text('谢谢您宝贵的意见！', 1);
		});
		$scope.data.message = '';
	}
}])
//投稿
.controller('uploadController', ['$scope', 'init', 'data', 'msg', 'UserService', function($scope, init, data, msg, UserService) {

	if(window.cordova && window.cordova.plugins.Keyboard)
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

	init.registerBase($scope);
	$scope.data = {};
	$scope.postJoke = function(){
		if (!$scope.data.message) return msg.text('请输入您的笑话！', 1);
		data.checkApi(UserService.upload($scope.data.message), function(res){
			$scope.goBack();
			msg.text('谢谢您宝贵的笑话！', 1);
		});
		$scope.data.message = '';
	}
}])
//关于我们
.controller('aboutController', ['$scope', 'init', 'config', function($scope, init, config) {
	init.registerBase($scope);
	$scope.vname = config.vname;
}])
//版本更新
.controller('versionController', ['$scope', '$rootScope', 'init', 'config', 'data', 'UserService', 'update', function($scope, $rootScope, init, config, data, UserService, update) {
	init.registerBase($scope);
	$scope.list = [];
	$scope.info = { oldname: config.vname };

	data.checkApi(UserService.version(), function(res) {
		$scope.list = res.list;
		$scope.info.url = res.url;
		$scope.info.vname = res.vname;
		$scope.info.vid = res.vid;
		if (!$rootScope.updateBack) $scope.update();
	});
	$scope.update = function() {
		update.download($scope.info.url);
		config.vid = $scope.info.vid;
		config.vname = $scope.info.vname;
	}
}]);
