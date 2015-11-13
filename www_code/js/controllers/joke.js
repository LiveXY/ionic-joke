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
.controller('jokeController', ['$scope', '$rootScope', 'util', 'init', 'msg', 'data', 'JokeService', function($scope, $rootScope, util, init, msg, data, JokeService) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() {
	});

	var currPage = 1;
	$scope.isMore = true;
	$scope.list = []; $scope.tags = null;
	$scope.nodata = false;
	$scope.cid = 0; $scope.tid = 0;

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
}]);
