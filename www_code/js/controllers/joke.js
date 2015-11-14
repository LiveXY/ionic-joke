//笑话控制器
'use strict';

//Tabs
app.controller('tabsController', ['$location', '$scope', '$rootScope', '$interval', 'init', 'data', 'config', 'UserService', function($location, $scope, $rootScope, $interval, init, data, config, UserService) {
	function refresh(){
		data.checkApi(UserService.messages(), function(res) {
			config.messages = parseInt(res.messages);
			$rootScope.messages = config.messages;
		});
	};
	$interval(refresh, 30 * 60 * 1000);
	$scope.go = function(path) { $location.path(path); };
}])
//笑话
.controller('jokeController', ['$scope', '$rootScope', '$ionicPopover', 'util', 'init', 'msg', 'data', 'config', 'JokeService', function($scope, $rootScope, $ionicPopover, util, init, msg, data, config, JokeService) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() {
		if (config.refresh.joke) $scope.refresh(1);
	});

	//popover
	$scope.cid = 0; $scope.tid = 0;
	$scope.changeTag = function(index) { $scope.tid = index; $scope.refresh(); $scope.popover.hide(); };
	$scope.changeOrder = function(index) { $scope.cid = index; $scope.refresh(); $scope.popover.hide(); };
	$scope.popover = $ionicPopover.fromTemplateUrl('popover.html', { scope: $scope }).then(function(popover) { $scope.popover = popover; });
	$scope.openPopover = function($event) { $scope.popover.show($event); };

	var currPage = 1;
	$scope.isMore = true;
	$scope.list = []; $scope.tags = null;
	$scope.nodata = false;

	$scope.iLike = function(id) {
		data.checkApi(JokeService.jokeLike(id), function(res) {
			config.refresh.like = true;
		});
	}
	$scope.iCopy = function(text) {
		if (window.cordova && window.cordova.plugins.clipboard) {
			cordova.plugins.clipboard.copy(text);
			msg.text('复制成功！', 1);
		}
	}
	$scope.loadData = function () {
		data.checkApi(JokeService.joke($scope.tid, $scope.cid, currPage), function(res) {
			$scope.isMore = res.list.length == 10;
			angular.forEach(res.list, function(item) {
				item.text = util.aes_decode($rootScope.uid, res.sign, item.text);
				item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
				$scope.list.push(item);
			});
			$scope.nodata = $scope.list.length == 0;
			if (res.tags && !$scope.tags) $scope.tags = res.tags;
		}, function() {
			$scope.isMore = false;
		}, function() {
			if (currPage == 1) $scope.$broadcast('scroll.refreshComplete');
			currPage++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.refresh = function (r) {
		$scope.list = [];
		currPage = 1;
		if (r) { $scope.isMore = true; $scope.scrollTop(); } else $scope.loadData();
	};
}])
//搜索
.controller('searchController', ['$scope', '$rootScope', 'util', 'init', 'msg', 'data', 'config', 'JokeService', function($scope, $rootScope, util, init, msg, data, config, JokeService) {
	init.registerBase($scope);

	var currPage = 1;
	$scope.isMore = false;
	$scope.list = [];
	$scope.nodata = false;
	$scope.searchKey = '';
	$scope.searchState = 0;

	$scope.iLike = function(id) {
		data.checkApi(JokeService.jokeLike(id), function(res) {
			config.refresh.like = true;
		});
	}
	$scope.iCopy = function(text) {
		if (window.cordova && window.cordova.plugins.clipboard) {
			cordova.plugins.clipboard.copy(text);
			msg.text('复制成功！', 1);
		}
	}
	$scope.loadData = function () {
		data.checkApi(JokeService.joke(0, 0, currPage, $scope.searchKey), function(res) {
			$scope.isMore = res.list.length == 10;
			angular.forEach(res.list, function(item) {
				item.text = util.aes_decode($rootScope.uid, res.sign, item.text);
				item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
				$scope.list.push(item);
			});
			$scope.nodata = $scope.list.length == 0;
		}, function() {
			$scope.isMore = false;
		}, function() {
			if (currPage == 1) $scope.$broadcast('scroll.refreshComplete');
			currPage++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.searchChange = function (key) {
		$scope.searchKey = key;
		if ($scope.searchKey == ''){
			$scope.searchState = 0;
		} else {
			$scope.searchState = 1;
		}
	};
	$scope.opClick = function() {
		if ($scope.searchState == 0) $scope.goBack();
		else if($scope.searchState == 1) {
			currPage = 1;
			$scope.list = [];
			$scope.scrollTop();
			$scope.loadData();
			$scope.searchState = 0;
		}
	}
}]);
