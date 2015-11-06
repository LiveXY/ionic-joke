//JPush
'use strict';

app.factory('jpush', ['$location', 'util', 'msg', function($location, util, message) {
	var isJPush = null, isInit = false, isShow = false;
	function receiveNotificationProcess(msg) {
		if (util.isString(msg) && msg.indexOf('{') == 0) msg = JSON.parse(msg);

		var msgAlert = '', msgExtra = {};
		if (msg && msg.alert) msgAlert = msg.alert;
		if (msg && msg.aps) msgAlert = msg.aps.alert;
		if (msg && msg.extras && msg.extras['cn.jpush.android.EXTRA']) msgExtra = msg.extras['cn.jpush.android.EXTRA'];

		window.plugins.jPushPlugin.setBadge(0);
		if (window.plugins.jPushPlugin.isPlatformIOS()) window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
	}
	function openNotificationProcess(msg) {
		if (util.isString(msg) && msg.indexOf('{') == 0) msg = JSON.parse(msg);

		var msgAlert = '', msgExtra = {};
		if (msg && msg.alert) msgAlert = msg.alert;
		if (msg && msg.aps) msgAlert = msg.aps.alert;
		if (msg && msg.extras && msg.extras['cn.jpush.android.EXTRA']) msgExtra = msg.extras['cn.jpush.android.EXTRA'];

		window.plugins.jPushPlugin.setBadge(0);
		if (window.plugins.jPushPlugin.isPlatformIOS()) window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
	}
	function receiveMessageProcess(msg) {
		if (isShow) return false;
		var msgAlert = '', msgExtra = {};
		if (util.isObject(msg) && msg.aps) msgAlert = msg.aps.alert;
		if (util.isString(msg) && msg.indexOf('{') == 0) msg = JSON.parse(msg);
		if (msg && msg.content) { //ios
			msgAlert = msg.content;
			msgExtra = msg.extras ? msg.extras : {};
		}
		if (msg && msg.message) { //android
			msgAlert = msg.message;
			msgExtra = msg.extras['cn.jpush.android.EXTRA'] ? msg.extras['cn.jpush.android.EXTRA'] : {};
		}
		if (msgExtra && msgExtra.type) {
			isShow = true;
			msgExtra.type = parseInt(msgExtra.type) || 0;
			switch(msgExtra.type) {
				case 1: break;
				case 2: break;
			}
		}
	}
	function receiveNotification() {
		window.plugins.jPushPlugin.receiveNotificationIniOSCallback = receiveNotificationProcess;
		window.plugins.jPushPlugin.receiveNotificationInAndroidCallback = receiveNotificationProcess;
		document.addEventListener("jpush.receiveNotification", receiveNotificationProcess);
	}
	function openNotification(){
		window.plugins.jPushPlugin.openNotificationIniOSCallback = openNotificationProcess;
		window.plugins.jPushPlugin.openNotificationInAndroidCallback = openNotificationProcess;
		document.addEventListener("jpush.openNotification", openNotificationProcess);
	}
	function receiveMessage() {
		window.plugins.jPushPlugin.receiveMessageIniOSCallback = receiveMessageProcess;
		window.plugins.jPushPlugin.receiveMessageInAndroidCallback = receiveMessageProcess;
		document.addEventListener("jpush.receiveMessage", receiveMessageProcess);
	}
	function init(){
		isJPush = window.plugins && window.plugins.jPushPlugin;
		if (isJPush && !isInit) {
			window.plugins.jPushPlugin.init();
			window.plugins.jPushPlugin.setDebugMode(true);
			receiveNotification();
			receiveMessage();
			openNotification();
			window.plugins.jPushPlugin.setBadge(0);
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0)
			isInit = true;
		}
	}
	return {
		setBadge: function(badge) {
			if (!isInit) init();
			if (isJPush) {
				window.plugins.jPushPlugin.setBadge(badge);
				if (window.plugins.jPushPlugin.isPlatformIOS()) window.plugins.jPushPlugin.setApplicationIconBadgeNumber(badge);
			}
		},
		setAlias: function(alias) {
			if (!isInit) init();
			if (isJPush) window.plugins.jPushPlugin.setAlias(alias);
		},
		setTags: function(tags) {
			if (!isInit) init();
			if (isJPush) window.plugins.jPushPlugin.setTags(tags);
		},
		setTagsWithAlias: function(tags, alias) {
			if (!isInit) init();
			if (isJPush) window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
		},
		init: function() { init(); }
	};
}]);
