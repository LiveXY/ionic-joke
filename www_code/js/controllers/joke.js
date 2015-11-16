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
	$scope.changeTag = function(index) { $scope.tid = index; $scope.refresh(1); $scope.popover.hide(); };
	$scope.changeOrder = function(index) { $scope.cid = index; $scope.refresh(1); $scope.popover.hide(); };
	$scope.popover = $ionicPopover.fromTemplateUrl('popover.html', { scope: $scope }).then(function(popover) { $scope.popover = popover; });
	$scope.openPopover = function($event) { $scope.popover.show($event); };

	var currPage = 1;
	$scope.isMore = true;
	$scope.list = []; $scope.tags = null;
	$scope.nodata = false;

	$scope.loadData = function () {
		data.checkApi(JokeService.joke($scope.tid, $scope.cid, currPage), function(res) {
			$scope.isMore = res.list.length == 10;
			angular.forEach(res.list, function(item) {
				item.text = util.aes_decode($rootScope.uid, res.sign, item.text);
				item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
				$scope.list.push(item);
			});
			$scope.nodata = $scope.list.length == 0;
			if (res.tags && !$scope.tags) {
				angular.forEach(res.tags, function(item) {
					item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
				});
				$scope.tags = res.tags;
			}
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
.controller('searchController', ['$timeout', '$scope', '$rootScope', 'util', 'init', 'msg', 'data', 'config', 'JokeService', function($timeout, $scope, $rootScope, util, init, msg, data, config, JokeService) {
	init.registerBase($scope);

	var currPage = 1;
	$scope.isMore = false;
	$scope.list = [];
	$scope.nodata = false;
	$scope.searchKey = '';
	$scope.searchState = 0;

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
			$timeout(function(){ $scope.searchState = 0; });
			currPage = 1;
			$scope.list = [];
			$scope.scrollTop();
			$scope.loadData();
		}
	}
}])
//喜欢
.controller('likeController', ['$scope', '$rootScope', 'init', 'data', 'msg', 'config', 'util', 'UserService', function($scope, $rootScope, init, data, msg, config, util, UserService) {
	init.registerBase($scope);

	$scope.$on('$ionicView.afterEnter', function() {
		if (config.refresh.like) $scope.refresh(1);
	});

	var currPage = 1, pageSize = 10;
	$scope.isMore = true;
	$scope.list = [];
	$scope.nodata = false;

	$scope.loadData = function () {
		data.checkApi(UserService.likes(currPage, pageSize), function(res) {
			$scope.isMore = res.list.length == pageSize;
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
	$scope.refresh = function (r) {
		config.refresh.like = false;
		$scope.list = [];
		currPage = 1;
		if (r) { $scope.isMore = true; $scope.scrollTop(); } else $scope.loadData();
	};
}])
//审核
.controller('auditController', ['$timeout', '$scope', '$rootScope', '$ionicModal', 'util', 'init', 'msg', 'data', 'config', 'JokeService', function($timeout, $scope, $rootScope, $ionicModal, util, init, msg, data, config, JokeService) {
	init.registerBase($scope);

	$scope.joke = null; var index = 0;
	$ionicModal.fromTemplateUrl('edit.html', function(modal) { $scope.modelAudit = modal; }, { scope: $scope, animation: 'slide-in-up' });
	$scope.showAudit = function(i) {
		index = i;
		$scope.joke = $scope.list[i];
		$scope.joke.tags = [];
		$scope.joke.score = 50;
		$scope.joke.text2 = $scope.joke.text.replace(/<br\/>/g, '\n');
		$timeout(function(){ $scope.modelAudit.show(); });
	};
	$scope.closeAudit = function() { $scope.modelAudit.hide(); };
	$scope.auditPost = function(reg) {
		//if (util.empty($scope.joke.title)) return msg.text('标题不能为空！', 1);
		if (util.empty($scope.joke.text2)) return msg.text('内容不能为空！', 1);
		if (util.empty($scope.joke.tags)) return msg.text('请选择标签！', 1);
		if ($scope.joke.id && $scope.joke.text && $scope.joke.tags && $scope.joke.score) {
			msg.loading('正在提交数据...');
			data.checkApi(JokeService.auditPost($scope.joke.id, $scope.joke.title, $scope.joke.text2, $scope.joke.tags, $scope.joke.score), function(res){
				$scope.joke = null;
				$scope.list.splice(index, 1);
				config.refresh.joke = true;
				$scope.closeAudit();
			}, null, function(){ msg.hide(); });
		}
	};
	$scope.auditDelete = function(i) {
		var id = $scope.list[i].id;
		msg.confirm('是否删除？').then(function(res) {
			if(res) {
				msg.loading('正在删除...');
				data.checkApi(JokeService.auditDelete(id), function(res) {
					$scope.list.splice(index, 1);
				}, null, function() {
					msg.hide();
				});
			}
		});
	};

	$scope.isMore = true;
	$scope.list = []; $scope.tags = null;
	$scope.nodata = false;

	$scope.loadData = function () {
		data.checkApi(JokeService.audit($scope.tags ? 0 : 1), function(res) {
			$scope.isMore = res.list.length == 10;
			angular.forEach(res.list, function(item) {
				var exist = false;
				for(var i in $scope.list) {
					if ($scope.list[i].id == item.id) { exist = true; break; }
				}
				if (!exist) {
					item.text = util.aes_decode($rootScope.uid, res.sign, item.text);
					item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
					$scope.list.push(item);
				}
			});
			$scope.nodata = $scope.list.length == 0;
			if (res.tags && !$scope.tags) {
				angular.forEach(res.tags, function(item) {
					item.title = util.aes_decode($rootScope.uid, res.sign, item.title);
				});
				$scope.tags = res.tags;
			}
		}, function() {
			$scope.isMore = false;
		}, function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.refresh = function (r) {
		config.refresh.like = false;
		$scope.list = [];
		if (r) { $scope.isMore = true; $scope.scrollTop(); } else $scope.loadData();
	};
}]);
