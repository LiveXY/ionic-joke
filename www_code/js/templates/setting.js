//设置模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//设置
$templateCache.put('setting.html', '\
<ion-view class="mine" title="设置">\
	<ion-content class="ioslist left45">\
		<div class="list">\
			<label ion-item class="item item-input item-select item-more">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-at-outline" style="color:#4DCEEB;font-size:35px;"></span>\
				<label>字体大小</label>\
				<select ng-model="$root.fontSize" ng-change="saveSetting(\'fontSize\', $root.fontSize)">\
					<option value="18">特大</option>\
					<option value="16">大</option>\
					<option value="14">中</option>\
					<option value="12">小</option>\
				</select>\
			</label>\
			<ion-toggle ng-model="$root.openNight" ng-checked="$root.openNight" ng-change="saveSetting(\'openNight\', $root.openNight)" toggle-class="toggle-{{$root.skin}}">\
				<span class="icon ion-ios-eye-outline" style="color:#8DD2CB;font-size:30px;"></span>\
				<span class="title">夜间模式</span>\
			</ion-toggle>\
		</div>\
		<div class="list">\
			<label ion-item class="item item-input item-more" ng-click="go(\'/upload\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-paperplane-outline" style="color:#FBCF32;font-size:30px;"></span>\
				<label>投稿</label>\
			</label>\
			<label ion-item class="item item-input item-more" ng-click="go(\'/feedback\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-compose-outline" style="color:#FD8323"></span>\
				<label>我要反馈</label>\
			</label>\
			<label ion-item class="item item-input item-more" ng-click="goStore()">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-heart-outline" style="color:red;font-size:23px;"></span>\
				<label>去评分</label>\
			</label>\
		</div>\
		<div class="list" ng-if="$root.admin==1">\
			<label ion-item class="item item-input item-more" ng-click="go(\'/audit\')">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-color-filter-outline" style="color:#0000ee"></span>\
				<label>审核笑话</label>\
			</label>\
		</div>\
		<div class="list">\
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
		<div class="padding"><button class="button button-block" ng-click="postFeedback()">提交意见</button></div>\
	</ion-content>\
</ion-view>\
');

//投稿
$templateCache.put('upload.html', '\
<ion-view title="投稿">\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content on-swipe-right="goBack()">\
		<div class="feedback-title">欢迎向我们提供笑话</div>\
		<div class="feedback-text"><textarea type="text" ng-model="data.message" placeholder="请输入您的笑话"></textarea></div>\
		<div class="padding"><button class="button button-block" ng-click="postJoke()">提交意见</button></div>\
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
