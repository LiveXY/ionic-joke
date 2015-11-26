//登录与分享
'use strict';

app.factory('login', ['data', 'msg', 'UserService', function(data, msg, UserService) {
	var wechatIsInstalled = false;
	var qqIsInstalled = false;

	return {
		init: function() {
			if (window['Wechat'] && Wechat.isInstalled)
				Wechat.isInstalled(function (installed) { if (installed) wechatIsInstalled = true; }, function (reason) { });
			if (window['YCQQ'] && YCQQ.checkClientInstalled)
				YCQQ.checkClientInstalled(function(){ qqIsInstalled = true; }, function () { });
		},
		wechatIsInstalled: function (){ return wechatIsInstalled; },
		qqIsInstalled: function (){ return qqIsInstalled; },
		//微信登录
		wechat: function(callback) {
			if (wechatIsInstalled) {
				Wechat.auth('snsapi_userinfo', function (res) {
					msg.loading('正在登录...');
					data.checkApi(UserService.wechatLogin(res.code), function(res){
						data.set('sessionKey', res.sessionKey);
						res.user.login = res.login;
						data.setObject('user', res.user);
						data.refreshAll();
						if (callback) callback();
						msg.hide();
					}, function(){
						msg.text('登录失败！', 2);
					});
				}, function (reason) {
					msg.text(reason, 2);
				});
			}
			return true;
		},
		//QQ登录
		qq: function(callback) {
			if (qqIsInstalled) {
				YCQQ.ssoLogin(function(res) {
					msg.loading('正在登录...');
					data.checkApi(UserService.qqLogin(res.userid, res.access_token), function(res){
						data.set('sessionKey', res.sessionKey);
						res.user.login = res.login;
						data.setObject('user', res.user);
						data.refreshAll();
						if (callback) callback();
						msg.hide();
					}, function(){
						msg.text('登录失败！', 2);
					});
				}, function(reason){
					msg.text(reason, 2);
				}, 1);
			}
			return true;
		},
		//就诊卡
		card: function(callback) {
			msg.text('暂不支持此登录！', 2);
			return false;
		}
	};
}])
.factory('shareTo', ['data', 'msg', function(data, msg) {
	//微信分享
	function wechatShare(title, description, thumb, url, scene, callback) {
		var params = {
			scene: scene,
			message: {
				title: title,
				description: description,
				thumb: thumb,
				media: {
					type: Wechat.Type.WEBPAGE,
					webpageUrl: url
				}
			}
		};
		if (title && !description && !thumb && !url) {
			params = { scene: scene, text: title };
		};
		Wechat.share(params, function () {
			msg.text((scene == 2 ? '收藏' : '分享') + '成功！', 5);
			if (callback) callback();
		}, function (reason) {
			msg.text((scene == 2 ? '收藏' : '分享') + '失败：' + reason, 5);
		});
	}
	function qqShare(title, description, thumb, url, type, callback) {
		var key = '', args = {
			url: url,
			title: title,
			description: description,
			imageUrl: thumb
		};
		if (title && !description && !thumb && !url) {
			params = { scene: scene, text: title };
		};
		switch(type){
			case 0: args.appName = '猪猪笑话'; key = "shareToQQ"; break;
			case 1: args.imageUrl = [thumb]; key = "shareToQzone"; break;
			case 2: args.appName = '猪猪笑话'; key = "addToQQFavorites"; break;
		}
		YCQQ[key](function(){
			msg.text((type == 2 ? '收藏' : '分享') + '成功！', 5);
			if (callback) callback();
		},function(reason){
			msg.text((type == 2 ? '收藏' : '分享') + '失败：' + reason, 5);
		},args);
	}
	return {
		//微信分享
		wechat: function(title, description, thumb, url, scene, callback) {
			if (typeof Wechat === "undefined") return msg.text('未安装微信插件！', 2);
			Wechat.isInstalled(function (installed) {
				if (installed) {
					Wechat.auth('snsapi_userinfo', function (response) {
						wechatShare(title, description, thumb, url, scene, callback);
					}, function (reason) {
						msg.text(reason, 2);
					});
				}
			}, function (reason) {
				msg.text(reason, 2);
			});
		},
		//QQ分享
		qq: function(title, description, thumb, url, type, callback) {
			if (typeof YCQQ === "undefined") return msg.text('未安装QQ插件！', 2);
			YCQQ.checkClientInstalled(function(){
				qqShare(title, description, thumb, url, type, callback);
			}, function () {

			});
		}
	};
}])
.factory('share', ['$ionicActionSheet', 'shareTo', 'login', function($ionicActionSheet, shareTo, login) {
	return {
		//弹出分享
		pop: function(title, description, thumb, url, callback) {
			if (login.wechatIsInstalled() && login.qqIsInstalled()) {
				$ionicActionSheet.show({
					titleText: '与朋友们分享',
					buttons: [
						{ text: '分享到微信朋友圈' },
						{ text: '分享到微信好友' },
						{ text: '收藏到微信' },
						{ text: '分享到QQ空间' },
						{ text: '分享到QQ好友' },
						{ text: '收藏到QQ' }
					],
					buttonClicked: function(index) {
						if (index === 0) shareTo.wechat(title, description, thumb, url, 1, callback);
						else if (index === 1) shareTo.wechat(title, description, thumb, url, 0, callback);
						else if (index === 2) shareTo.wechat(title, description, thumb, url, 2, callback);
						else if (index === 3) shareTo.qq(title, description, thumb, url, 1, callback);
						else if (index === 4) shareTo.qq(title, description, thumb, url, 0, callback);
						else if (index === 5) shareTo.qq(title, description, thumb, url, 2, callback);
						return true;
					}
				});
			} else if (login.wechatIsInstalled()) {
				$ionicActionSheet.show({
					titleText: '与朋友们分享',
					buttons: [
						{ text: '分享到微信朋友圈' },
						{ text: '分享到微信好友' },
						{ text: '收藏到微信' }
					],
					buttonClicked: function(index) {
						if (index === 0) shareTo.wechat(title, description, thumb, url, 1, callback);
						else if (index === 1) shareTo.wechat(title, description, thumb, url, 0, callback);
						else if (index === 2) shareTo.wechat(title, description, thumb, url, 2, callback);
						return true;
					}
				});
			} else if (login.qqIsInstalled()) {
				$ionicActionSheet.show({
					titleText: '与朋友们分享',
					buttons: [
						{ text: '分享到QQ空间' },
						{ text: '分享到QQ好友' },
						{ text: '收藏到QQ' }
					],
					buttonClicked: function(index) {
						if (index === 0) shareTo.qq(title, description, thumb, url, 1, callback);
						else if (index === 1) shareTo.qq(title, description, thumb, url, 0, callback);
						else if (index === 2) shareTo.qq(title, description, thumb, url, 2, callback);
						return true;
					}
				});
			}

		}
	}
}]);
