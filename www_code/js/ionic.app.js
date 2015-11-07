//路由配置
'use strict';

var app = angular.module('jokeApp', ['ionic', 'ngIOS9UIWebViewPatch', 'ngCordova'])
//配置基础数据
.constant('config', {
	vid: 100, vname: 'v1.0.0', bundleid: 'com.livexy.joke',
	refresh: {},
	api: 'http://192.168.1.104:8021/app/{0}?callback=JSON_CALLBACK',
	//api: 'http://joke.relaxlife.net/app/{0}?callback=JSON_CALLBACK',
	apiTimeout: 30 * 1000
})
//全局配置
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
	$ionicConfigProvider.views.swipeBackEnabled(false);
	$ionicConfigProvider.platform.android.scrolling.jsScrolling(true);

	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('ios');
	$ionicConfigProvider.views.transition('none'); //禁止动画
	$ionicConfigProvider.spinner.icon('ios'); //android
}])
//全局错误处理
.factory('$exceptionHandler', ['$injector', 'config', function($injector, config) {
	return function(exception, cause) {
		var formatted = '';
		var properties = '';
		formatted += 'Exception: "' + exception.toString() + '"\n';
		formatted += 'Caused: ' + cause + '\n';

		properties += (exception.message) ? 'Message: ' + exception.message + '\n' : ''
		properties += (exception.fileName) ? 'File Name: ' + exception.fileName + '\n' : ''
		properties += (exception.lineNumber) ? 'Line Number: ' + exception.lineNumber + '\n' : ''
		properties += (exception.stack) ? 'Stack Trace: ' + exception.stack + '\n' : ''

		if (properties) formatted += properties;

		var $location = $injector.get('$location');
		formatted = 'Url: ' + $location.path() + '\n' + formatted;
		console.log(formatted);

		if (!config.errors) config.errors = [];
		if (config.errors.indexOf(formatted) != -1) return false;

		var UserService = $injector.get('UserService');
		UserService.feedback(formatted).then(function(res) { });
		config.errors.push(formatted);
	};
}])
//路由配置
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('tabs', { url: '/tabs', abstract: true, templateUrl: 'tabs.html', controller: 'tabsController' })

	.state('tabs.joke', { url: '/joke', views: { joke: { templateUrl: 'joke.html', controller: 'jokeController' }}})

	.state('tabs.meitu', { url: '/meitu', views: { meitu: { templateUrl: 'meitu.html', controller: 'meituController' }}})

	.state('tabs.like', { url: '/like', views: { like: { templateUrl: 'like.html', controller: 'likeController' }}})

	.state('tabs.setting', { url: '/setting', views: { setting: { templateUrl: 'setting.html', controller: 'settingController' }}})
	.state('feedback', { url: '/feedback', templateUrl: 'feedback.html', controller: 'feedbackController' })
	.state('about', { url: '/about', templateUrl: 'about.html', controller: 'aboutController' })
	.state('version', { url: '/version', templateUrl: 'version.html', controller: 'versionController' });
}])
//配置白名单
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://joke.relaxlife.net/*',
		'http://joke.relaxlife.net/*'
	]);
}])
//启动
.run(['$ionicPlatform', '$rootScope', '$location', '$ionicHistory', '$timeout', 'init', 'msg', 'data', function($ionicPlatform, $rootScope, $location, $ionicHistory, $timeout, init, msg, data) {
	$rootScope.skin = data.get('skin') || 'assertive';

	//禁用系统的虚拟返回键
	$ionicPlatform.registerBackButtonAction(function (e) {
		if ($location.path().indexOf('tabs/') != -1) {
			if ($rootScope.backButtonPressedOnceToExit) {
				ionic.Platform.exitApp();
				$rootScope.$destroy();
			} else {
				$rootScope.backButtonPressedOnceToExit = true;
				msg.text('再按一次退出系统', 0.9);
				$timeout(function () { $rootScope.backButtonPressedOnceToExit = false; }, 3000);
			}
		} else if ($ionicHistory.backView()) {
			$ionicHistory.goBack();
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}, 101);
	//$ionicPlatform.on('resume', function(e) { }); //激活
	//$ionicPlatform.on('pause', function(e) { }); //暂停
	//$ionicPlatform.on('online', function(e) { }); //联网

	function auth(uuid){
		init.auth(uuid).then(function(u) {
			if (navigator.splashscreen) $timeout(function(){ navigator.splashscreen.hide(); }, 1000);

			if (u && u.update==1 && navigator.connection) {
				$location.path('/version');
				return false;
			}
			init.setJPushTagsAndAlias();
			$location.path('/tabs/joke');
		});
	};

	$ionicPlatform.ready(function() {
		if (navigator.connection && navigator.connection.type == 'none') {
			if (navigator.splashscreen) navigator.splashscreen.hide();
			return msg.text('请连接网络！');
		}
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) StatusBar.styleLightContent();

		var uuid = init.uuid();
		if (!uuid) return auth();

		uuid.then(function(uuid){
			auth(uuid);
		}, function(err){
			return msg.text('初始化设备失败！');
		});
	});
}]);
