//美图控制器
'use strict';

//美图
app.controller('meituController', ['$scope', '$rootScope', 'init', 'msg', 'data', 'MeituService', function($scope, $rootScope, init, msg, data, MeituService) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() {
	});

	var currPage = 1;
	$scope.isMore = true;
	$scope.list = []; $scope.tags = null;
	$scope.nodata = false;
	$scope.cid = 0; $scope.tid = 0;

	$scope.loadData = function () {
		data.checkApi(MeituService.meitu($scope.tid, $scope.cid, currPage), function(res) {
			$scope.isMore = res.list.length == 10;
			angular.forEach(res.list, function(item) { $scope.list.push(item); });
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
