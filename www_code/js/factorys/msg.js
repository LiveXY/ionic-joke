//显示消息
'use strict';

app.factory('msg', ['$ionicLoading', '$ionicPopup', '$timeout', function($ionicLoading, $ionicPopup, $timeout) {
	return {
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
		hide: function(){ $ionicLoading.hide(); },
		//加载中消息
		loading: function(msg) {
			msg = msg || '正在加载数据...';
			$ionicLoading.show({ template: '<ion-spinner class="joke-loading"></ion-spinner><br>'+msg });
		},
		//弹出消息
		alert: function(title, text) {
			var option = { okText: '确定' };
			if (title && text) {
				option['title'] = title;
				option['template'] = text;
			} else {
				option['title'] = title;
				option['cssClass'] = 'pop-alert';
			}
			$ionicPopup.alert(option);
		},
		//确认消息
		confirm: function(title, text, okText) {
			var option = { okText: okText||'确定', cancelText:'取消' };
			if (title && text) {
				option['title'] = title;
				option['template'] = text;
			} else {
				option['title'] = title;
				option['cssClass'] = 'pop-alert';
			}
			return $ionicPopup.confirm(option);
		}
	};
}]);
