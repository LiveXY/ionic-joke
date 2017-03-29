//配置配置
'use strict';

//配置基础数据
app.constant('config', {
	vid: 101, vname: 'v1.0.1', bundleid: 'com.livexy.joke',
	refresh: {},
	api: 'http://joke2.5alife.cn/app/{0}?callback=JSON_CALLBACK',
	apiTimeout: 30 * 1000,
	fontSizes: [{id:"20",name:"特大"},{id:"18",name:"大"},{id:"16",name:"中"},{id:"14",name:"小"}]
})
//配置白名单
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://joke2.5alife.cn/*',
		'http://joke2.5alife.cn/*'
	]);
}]);