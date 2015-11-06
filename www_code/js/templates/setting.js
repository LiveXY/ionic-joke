//设置模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//喜欢
$templateCache.put('like.html', '\
<ion-view title="喜欢">\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<ion-list>\
		</ion-list>\
		<div ng-if="nodata" class="nodata">暂无数据！</div>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');

//设置
$templateCache.put('setting.html', '\
<ion-view class="mine" title="设置">\
	<ion-content class="ioslist minelist">\
		<div class="list mtop5">\
			<label ion-item class="item item-input item-more">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-chatbubble-outline" style="color:#4DCEEB"></span>\
				<label>字体大小</label>\
			</label>\
			<label ion-item class="item item-input item-more">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-pulse" style="color:#8DD2CB"></span>\
				<label>夜间模式</label>\
			</label>\
			<label ion-item class="item item-input item-more" ng-click="goStore()">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-heart-outline" style="color:red"></span>\
				<label>去评分</label>\
			</label>\
		</div>\
		<div class="list mtop5">\
			<label ion-item class="item item-input item-more" ng-click="go(\'/upload\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-medkit" style="color:#FBCF32"></span>\
				<label>投稿</label>\
			</label>\
			<label ion-item class="item item-input item-more" ng-click="go(\'/feedback\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-compose-outline" style="color:#FD8323"></span>\
				<label>我要反馈</label>\
			</label>\
		</div>\
		<div class="list mtop5">\
			<label ion-item class="item item-input item-more" ng-click="go(\'/about\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-email-outline" style="color:#9BCA71"></span>\
				<label>关于我们</label>\
			</label>\
		</div>\
	</ion-content>\
</ion-view>\
');

//版本
$templateCache.put('version.html', '\
<ion-view title="有最新的版本了" cache-view="false">\
	<ion-nav-buttons side="left">\
		<button ng-if="$root.updateBack" class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content>\
		<div class="info-title">最新版本：{{info.vname}}</div>\
		<div class="info-small">当前版本：{{info.oldname}}</div>\
		<div class="padding pb0" ng-repeat="item in list">\
			<div class="version-title">{{item.vname}} 更新内容：</div>\
			<div class="version-text" data-ng-bind-html="item.vtext | toSafeHtml"></div>\
		</div>\
		<div class="padding" ng-if="$root.updateBack"><button class="button button-block btn" ng-click="update()">下载更新</button></div>\
	</ion-content>\
</ion-view>\
');

//我要反馈
$templateCache.put('feedback.html', '\
<ion-view title="我要反馈">\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content on-swipe-right="goBack()">\
		<div class="feedback-title">欢迎向我们提出改进意见</div>\
		<div class="feedback-text"><textarea type="text" ng-model="data.message" placeholder="请输入您的反馈意见"></textarea></div>\
		<div class="padding"><button class="button button-block btn btnFeedback" ng-click="postFeedback()">提交意见</button></div>\
	</ion-content>\
</ion-view>\
');

//关于我们
$templateCache.put('about.html', '\
<ion-view title="关于我们" class="about-view">\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content>\
	</ion-content>\
</ion-view>\
');

}]);
