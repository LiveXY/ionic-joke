//交流API接口
'use strict';

app.factory('JokeService', ['$http', 'config', 'data', function($http, config, data) {
	return {
		//笑话
		joke: function(tid, cid, page) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('joke'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), tid: tid, cid: cid, page: page }
			});
		},
		//喜欢笑话
		jokeLike: function(id){
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('likeJoke'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), id: id }
			});
		},
		//分享笑话
		jokeShare: function(id) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('shareJoke'),
				method: 'jsonp',
				params: { id: id }
			});
		}
	};
}]);
