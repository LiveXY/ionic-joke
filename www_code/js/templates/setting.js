//设置模版
'use strict';

app.run(['$templateCache', function($templateCache) {
$templateCache.put('select1.html', '\
<ion-popover-view class="win">\
	<header class="bar">\
		<button class="button button-icon" ng-click="close()">{{cancelText}}</button>\
		<h1 class="title">{{title}}</h1>\
		<button class="button button-icon" ng-click="save()">{{okText}}</button>\
	</header>\
	<div class="select-inner">\
		<div class="row">\
			<div class="col">\
				<ion-scroll delegate-handle="selectHandle" on-scroll="selectScroll(\'selectHandle\')" scrollbar-y="false">\
				<ul><li ng-repeat="item in data">{{item.name}}</li></ul>\
				</ion-scroll>\
			</div>\
		</div>\
		<div class="picker-center-highlight"></div>\
	</div>\
</ion-popover-view>\
');
//设置
$templateCache.put('setting.html', '\
<ion-view class="mine" title="设置">\
	<ion-content class="ioslist left45">\
		<div class="list">\
			<ion-select class="item item-input item-more" ng-model="$root.fontSize" ng-save="saveSetting(\'fontSize\', $root.fontSize)" source="$root.fontSizes" title="字体大小" ico-class="ion-ios-at-outline" ico-size="35"></ion-select>\
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
			<label ng-if="showShareButton" ion-item class="item item-input item-more" ng-click="showShare()">\
				<i class="ion-ios-arrow-right"></i>\
				<span class="icon ion-ios-star-outline" style="color:#9BCA71"></span>\
				<label>分享给好友</label>\
			</label>\
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
		<div class="padding" ng-if="$root.updateBack"><button class="button button-block button-{{$root.skin}}" ng-click="update()">下载更新</button></div>\
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
		<div class="padding"><button class="button button-block button-{{$root.skin}}" ng-click="postFeedback()">提交意见</button></div>\
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
		<div class="padding"><button class="button button-block button-{{$root.skin}}" ng-click="postJoke()">提交意见</button></div>\
	</ion-content>\
</ion-view>\
');

//关于我们
$templateCache.put('about.html', '\
<ion-view title="关于我们" class="about-view">\
	<ion-nav-buttons side="left">\
		<button class="button button-icon button-clear ion-ios-arrow-left" ng-click="goBack()"></button>\
	</ion-nav-buttons>\
	<ion-content class="ioslist left14">\
		<div class="about-title"><img src="img/icon.png" /><br/>猪猪笑话</div>\
		<div class="list">\
			<label ion-item class="item item-input">\
				版本：{{vname}}\
			</label>\
			<label ion-item class="item item-input" ng-click="iCopy(\'https://github.com/livexy\')">\
				开源：https://github.com/livexy\
			</label>\
		</div>\
		<div class="about-tip">本软件中的内容均来自互联网，如果您对本软件内容有疑问，也请联系我，我会及时回复的！联系邮箱：cexo255@qq.com</div>\
	</ion-content>!-->\
</ion-view>\
');

}]);
