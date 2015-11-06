//设置控制器
'use strict';

//我的
app.controller('settingController', ['$scope', '$rootScope', 'init', 'data', 'config', function($scope, $rootScope, init, data, config) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() { });

	$scope.goStore = function() {
		var url = '';
		if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) url = 'itms-apps://itunes.apple.com/us/app/dared/id907391728?ls=1&mt=8';
		if (ionic.Platform.isAndroid()) url = 'market://details?id='+config.bundleid.split('-')[0];
		if (url) window.open(url, '_system');
	}
	$scope.goUpdate = function() {
		$rootScope.updateBack = true;
		$scope.go('/version');
	}
}])
//喜欢
.controller('likeController', ['$scope', 'init', 'data', 'msg', 'config', 'UserService', function($scope, init, data, msg, config, UserService) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() {
		if (config.refresh.like) $scope.refresh(1);
	});

	var currPage = 1, pageSize = 10;
	$scope.isMore = true;
	$scope.list = [];
	$scope.nodata = false;

	$scope.loadData = function () {
		data.checkApi(UserService.mylike(currPage, pageSize), function(res) {
			$scope.isMore = res.list.length == pageSize;
			angular.forEach(res.list, function(item) { $scope.list.push(item); });
			$scope.nodata = $scope.list.length == 0;
		}, function() {
			$scope.isMore = false;
		}, function() {
			if (currPage == 1) $scope.$broadcast('scroll.refreshComplete');
			currPage++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.refresh = function (r) {
		config.refresh.like = false;
		$scope.list = [];
		currPage = 1;
		if (r) { $scope.isMore = true; $scope.scrollTop(); } else $scope.loadData();
	};
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
//关于我们
.controller('aboutController', ['$scope', 'init', 'config', function($scope, init, config) {
	init.registerBase($scope);
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
