//笑话模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//Tabs
$templateCache.put('tabs.html', '\
<ion-tabs class="tabs-icon-top tabs-color-{{$root.skin}}">\
	<ion-tab title="笑话" icon-on="ion-happy" icon-off="ion-happy" ng-click="go(\'/tabs/joke\')"><ion-nav-view name="joke"></ion-nav-view></ion-tab>\
	<ion-tab title="美图" icon-on="ion-images" icon-off="ion-images" ng-click="go(\'/tabs/meitu\')"><ion-nav-view name="meitu"></ion-nav-view></ion-tab>\
	<ion-tab title="喜欢" icon-on="ion-ios-heart" icon-off="ion-ios-heart" ng-click="go(\'/tabs/like\')"><ion-nav-view name="like"></ion-nav-view></ion-tab>\
	<ion-tab title="设置" icon-on="ion-ios-gear" icon-off="ion-ios-gear" ng-click="go(\'/tabs/setting\')"><ion-nav-view name="setting"></ion-nav-view></ion-tab>\
</ion-tabs>\
');

//笑话列表
$templateCache.put('joke.html', '\
<ion-view title="笑话">\
	<ion-nav-buttons side="right">\
		<button class="button button-icon button-clear ion-ios-search" ng-click="goSearch()"></button>\
	</ion-nav-buttons>\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-settings" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<div ion-item class="item-card" ng-repeat="item in list">\
			<div class="item item-body"><p style="font-size:{{$root.fontSize}}px">{{item.text}}</p></div>\
			<div class="item item-footer">\
				<span><a class="item-note" like-animated="likeAnimated fadeOutUp" ng-click="iLike(item.id)"><i class="icon ion-ios-heart-outline"></i> 喜欢</a></span>\
				<a ng-click="iCopy(item.text)"><i class="icon ion-ios-copy-outline"></i> 复制</a>\
			</div>\
		</div>\
		<div ng-if="nodata" class="nodata">暂无数据！</div>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');

}]);
