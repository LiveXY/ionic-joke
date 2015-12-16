//显示消息
'use strict';

app.factory('msg', ['$rootScope', '$ionicLoading', '$ionicPopup', '$timeout', function($rootScope, $ionicLoading, $ionicPopup, $timeout) {
	return {
		top: function(view, msg, cb) {
			var top = document.querySelector('ion-nav-view[name="{0}"] > ion-view > ion-content'.format(view)).offsetTop;
			var msgObj = angular.element(document.querySelector('ion-nav-view[name="{0}"] > ion-view > .top-msg'.format(view)));
			var viewObj = angular.element(document.querySelector('ion-nav-view[name="{0}"] > ion-view'.format(view)));
			if (msgObj.length > 0) { msgObj.text(msg); return false; }
			viewObj.append('<div class="top-msg">{0}</div>'.format(msg));
			msgObj = angular.element(document.querySelector('ion-nav-view[name="{0}"] > ion-view > .top-msg'.format(view)));
			if (msgObj) {
				msgObj[0].style.top = top + 'px';
				if (cb) msgObj.bind('click', function(){
					msgObj.addClass('fadeOutUp');
					$timeout(cb, 500);
				});
			}
		},
		//提示消息 s秒后自动隐藏
		text: function(msg, s) {
			msg = msg || '';
			var option = { template: msg };
			if (s) option['noBackdrop'] = true;
			$ionicLoading.show(option);
			if (s) $timeout(function(){ $ionicLoading.hide(); }, s * 1000);
		},
		//成功提示消息 s秒后自动隐藏
		success: function(msg, s) {
			msg = msg || '';
			var option = { template: '<i class="icon ion-ios-checkmark-outline pop-msg"></i><br>' + msg };
			if (s) option['noBackdrop'] = true;
			$ionicLoading.show(option);
			if (s) $timeout(function(){ $ionicLoading.hide(); }, s * 1000);
		},
		//错误提示消息 s秒后自动隐藏
		error: function(msg, s) {
			msg = msg || '';
			var option = { template: '<i class="icon ion-ios-close-outline pop-msg"></i><br>' + msg };
			if (s) option['noBackdrop'] = true;
			$ionicLoading.show(option);
			if (s) $timeout(function(){ $ionicLoading.hide(); }, s * 1000);
		},
		//隐藏
		hide: function(view){
			if (view) angular.element(document.querySelector('ion-nav-view[name="{0}"] > ion-view > .top-msg'.format(view))).remove();
			$ionicLoading.hide();
		},
		//加载中消息
		loading: function(msg) {
			msg = msg || '正在加载数据...';
			$ionicLoading.show({ template: '<ion-spinner class="joke-loading"></ion-spinner><br>'+msg });
		},
		//弹出消息
		alert: function(title, text) {
			var option = { okText: '确定', okType:'button-'+$rootScope.skin };
			if (title && text) {
				option['title'] = title;
				option['template'] = text;
				option['cssClass'] = 'pop-alert2';
			} else {
				option['title'] = title;
				option['cssClass'] = 'pop-alert';
			}
			var pop = $ionicPopup.alert(option);
			$timeout(function() {
				angular.element(document.querySelector('.popup-container'))
					.css('pointer-events', 'all')
					.bind('click', function(){ pop.close(); });
			}, 500);
		},
		//确认消息
		confirm: function(title, text, okText) {
			var option = { okText: okText||'确定', okType:'button-'+$rootScope.skin, cancelText:'取消' };
			if (title && text) {
				option['title'] = title;
				option['template'] = text;
				option['cssClass'] = 'pop-alert2';
			} else {
				option['title'] = title;
				option['cssClass'] = 'pop-alert';
			}
			var pop = $ionicPopup.confirm(option);
			$timeout(function() {
				angular.element(document.querySelector('.popup-container'))
					.css('pointer-events', 'all')
					.bind('click', function(){ pop.close(); });
			}, 500);
			return pop;
		}
	};
}]);
