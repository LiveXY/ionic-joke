//交流API接口
'use strict';

app.factory('JokeService', ['$http', 'config', 'data', function($http, config, data) {
	return {
		//笑话
		joke: function(tid, cid, page, key) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('joke'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), tid: tid, cid: cid, page: page, key: key }
			});
		},
		//喜欢笑话
		jokeLike: function(id){
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('jokeLike'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), id: id }
			});
		},
		//分享笑话
		jokeShare: function(id) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('jokeShare'),
				method: 'jsonp',
				params: { id: id }
			});
		},
		//审核
		audit: function(tag) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('audit'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), tag: tag }
			});
		},
		//审核
		auditPost: function(id, title, text, tags, score) {
			return $http({
				timeout: config.apiTimeout,
				url: config.api.format('auditPost'),
				method: 'jsonp',
				params: { sessionKey: data.get('sessionKey'), id: id, title: title, text: text, tags: tags, score: score }
			});
		}
	};
}]);
