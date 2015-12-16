//笑话模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//Tabs
$templateCache.put('tabs.html', '\
<ion-tabs class="tabs-icon-top tabs-color-{{$root.skin}}">\
	<ion-tab title="笑话" icon-on="ion-happy" icon-off="ion-happy" ng-click="go(\'/tabs/joke\')"><ion-nav-view name="joke"></ion-nav-view></ion-tab>\
	<!--<ion-tab title="美图" icon-on="ion-images" icon-off="ion-images" ng-click="go(\'/tabs/meitu\')"><ion-nav-view name="meitu"></ion-nav-view></ion-tab>!-->\
	<ion-tab title="喜欢" icon-on="ion-ios-heart" icon-off="ion-ios-heart" ng-click="go(\'/tabs/like\')"><ion-nav-view name="like"></ion-nav-view></ion-tab>\
	<ion-tab title="设置" icon-on="ion-ios-gear" icon-off="ion-ios-gear" ng-click="go(\'/tabs/setting\')"><ion-nav-view name="setting"></ion-nav-view></ion-tab>\
</ion-tabs>\
');

$templateCache.put('popover.html', '\
<ion-popover-view class="filter-menu"><ion-content>\
	<div class="filter-title">排序</div>\
	<ion-list class="ioslist left14 mb0">\
		<ion-item ng-click="changeOrder(0)"><span><i ng-if="cid == 0" class="ion-checkmark-round"></i></span> 最新</ion-item>\
		<ion-item ng-click="changeOrder(1)"><span><i ng-if="cid == 1" class="ion-checkmark-round"></i></span> 最热</ion-item>\
	</ion-list>\
	<div class="filter-title">分类</div>\
	<ion-list class="ioslist left14">\
		<ion-item ng-click="changeTag(0)"><span><i ng-if="tid == 0" class="ion-checkmark-round"></i></span> 全部</ion-item>\
		<ion-item ng-repeat="item in tags" ng-click="changeTag(item.id)"><span><i ng-if="tid == item.id" class="ion-checkmark-round"></i></span> {{item.title}}</ion-item>\
	</ion-list>\
</ion-content></ion-popover-view>\
');

//笑话列表
$templateCache.put('joke.html', '\
<ion-view title="笑话">\
	<ion-nav-buttons side="right">\
		<button class="button button-icon button-clear ion-ios-search" ng-click="go(\'/search\')"></button>\
	</ion-nav-buttons>\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-settings" ng-click="openPopover()"></button>\
	</ion-nav-buttons>\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<div ion-item class="item-card" ng-repeat="item in list">\
			<div class="item item-body">\
				<div style="font-size:{{$root.fontSize}}px;text-align:center;" ng-if="item.title!=\'\'">{{item.title}}</div>\
				<p style="font-size:{{$root.fontSize}}px" data-ng-bind-html="item.text | safeHtml"></p>\
			</div>\
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

//笑话列表
$templateCache.put('search.html', '\
<ion-view class="search-view">\
	<ion-nav-title class="search-box bar bar-header item-input-inset">\
		<label class="item-input-wrapper">\
			<i class="icon ion-ios-search placeholder-icon"></i>\
			<input type="search" placeholder="请输入搜索关键字" ng-model="searchKey" ng-change="searchChange(searchKey)" ng-blur="searchChange(searchKey)">\
		</label>\
		<button class="button button-clear" ng-click="opClick()">{{searchState==0?\'关闭\':\'搜索\'}}</button>\
	</ion-nav-title>\
	<ion-content>\
		<div ion-item class="item-card" ng-repeat="item in list">\
			<div class="item item-body">\
				<div style="font-size:{{$root.fontSize}}px;text-align:center;" ng-if="item.title!=\'\'">{{item.title}}</div>\
				<p style="font-size:{{$root.fontSize}}px" data-ng-bind-html="item.text | safeHtml"></p>\
			</div>\
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

//喜欢
$templateCache.put('like.html', '\
<ion-view title="喜欢">\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<div ion-item class="item-card" ng-repeat="item in list">\
			<div class="item item-body">\
				<div style="font-size:{{$root.fontSize}}px;text-align:center;" ng-if="item.title!=\'\'">{{item.title}}</div>\
				<p style="font-size:{{$root.fontSize}}px" data-ng-bind-html="item.text | safeHtml"></p>\
			</div>\
			<div class="item item-footer">\
				<span><a class="item-note" like-animated="likeAnimated fadeOutUp" ng-click="iLike(item.id)"><i class="icon ion-ios-heart-outline"></i> 喜欢</a></span>\
				<a ng-click="iCopy(item.text)"><i class="icon ion-ios-copy-outline"></i> 复制</a>\
			</div>\
		</div>\
		<div ng-if="nodata" class="nodata">你还没有喜欢的笑话！</div>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');

//审核
$templateCache.put('audit.html', '\
<ion-view>\
	<ion-nav-title>\
		<div ng-if="!search" class="main-box bar bar-header">\
			<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
			<div class="title">审核笑话</div>\
			<button class="button button-icon button-clear ion-ios-search" ng-click="showSearch()"></button>\
		</div>\
		<div ng-if="search" class="search-box bar bar-header item-input-inset">\
			<label class="item-input-wrapper">\
				<i class="icon ion-ios-search placeholder-icon"></i>\
				<input type="search" placeholder="请输入搜索关键字" ng-model="searchKey" ng-change="searchChange(searchKey)" ng-blur="searchChange(searchKey)">\
			</label>\
			<button class="button button-clear" ng-click="opClick()">{{searchState==0?\'关闭\':\'搜索\'}}</button>\
		</div>\
	</ion-nav-title>\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<div ion-item class="item-card" ng-repeat="item in list">\
			<div class="item item-body">\
				<p style="font-size:{{$root.fontSize}}px" data-ng-bind-html="item.text | safeHtml"></p>\
			</div>\
			<div class="item item-footer">\
				<a class="item-note" ng-click="showAudit($index)"><i class="icon ion-ios-color-filter-outline"></i> 审核</a>\
				<a ng-click="iCopy(item.text)"><i class="icon ion-ios-copy-outline"></i> 复制</a>　　\
				<a ng-click="auditDelete($index)"><i class="icon ion-ios-close-outline"></i> 删除</a>\
			</div>\
		</div>\
		<div ng-if="nodata" class="nodata">暂无数据！</div>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');
$templateCache.put('edit.html', '\
<ion-modal-view>\
	<ion-header-bar class="bar-{{$root.skin}} bar bar-header">\
		<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="closeAudit()"></button>\
		<div class="title">审核</div>\
	</ion-header-bar>\
	<ion-content>\
		<div class="audit-title">内容：</div>\
		<div class="audit-edit"><textarea type="text" ng-model="joke.text2" placeholder="请输入您的内容"></textarea></div>\
		<div class="audit-title">标题：</div>\
		<div class="audit-edit"><input type="text" ng-model="joke.title" placeholder="请输入标题" /></div>\
		<div class="audit-title">标签：</div>\
		<div class="audit-edit"><ion-tags source="tags" ng-model="joke.tags"></ion-tags></div>\
		<div class="audit-title">评分：{{joke.score}}</div>\
		<div class="audit-edit item range range-{{$root.skin}}"><input type="range" ng-model="joke.score" min="1" max="100"></div>\
		<div class="padding"><button class="button button-block button-{{$root.skin}}" ng-click="auditPost()">提交审核</button></div>\
	</ion-content>\
</ion-modal-view>\
');

}]);
