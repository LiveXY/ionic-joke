//百科API接口
'use strict';

app.factory('MeituService', ['$http', 'config', 'data', function($http, config, data) {
	return {
		//美图
		meitu: function(tid, cid, page) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('meitu'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), tid: tid, cid: cid, page: page }
			});
		},
		//喜欢美图
		likeMeitu: function(id){
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('likeMeitu'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), id: id }
			});
		},
		//分享美图
		shareMeitu: function(id) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('shareMeitu'),
				method: 'jsonp',
				params: { id: id }
			});
		}
	};
}]);
