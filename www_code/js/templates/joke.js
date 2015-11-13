//笑话模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//Tabs
$templateCache.put('tabs.html', '\
<ion-tabs class="tabs-icon-top tabs-color-{{$root.skin}}">\
	<ion-tab title="广场" a="笑话" icon-on="ion-happy" icon-off="ion-happy" ng-click="go(\'/tabs/joke\')"><ion-nav-view name="joke"></ion-nav-view></ion-tab>\
	<ion-tab title="美图" icon-on="ion-images" icon-off="ion-images" ng-click="go(\'/tabs/meitu\')"><ion-nav-view name="meitu"></ion-nav-view></ion-tab>\
	<ion-tab title="喜欢" icon-on="ion-ios-heart" icon-off="ion-ios-heart" ng-click="go(\'/tabs/like\')"><ion-nav-view name="like"></ion-nav-view></ion-tab>\
	<ion-tab title="设置" icon-on="ion-ios-gear" icon-off="ion-ios-gear" ng-click="go(\'/tabs/setting\')"><ion-nav-view name="setting"></ion-nav-view></ion-tab>\
</ion-tabs>\
');

//笑话列表
$templateCache.put('joke.html', '\
<ion-view title="笑话">\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<ion-list>\
		</ion-list>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');

}]);
