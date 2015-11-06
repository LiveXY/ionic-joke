//美图模版
'use strict';

app.run(['$templateCache', function($templateCache) {

//美图列表
$templateCache.put('meitu.html', '\
<ion-view title="美图">\
	<ion-content>\
		<ion-refresher on-refresh="refresh()" pulling-text="下拉刷新..."></ion-refresher>\
		<ion-list>\
		</ion-list>\
		<ion-infinite-scroll ng-if="isMore" on-infinite="loadData()" distance="10%"><ion-spinner icon="ios"></ion-spinner></ion-infinite-scroll>\
	</ion-content>\
</ion-view>\
');

}]);
