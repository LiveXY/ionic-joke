//分享
'use strict';

app.factory('shareTo', ['data', 'msg', function(data, msg) {
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
		},
		//微博分享
		weibo: function(title, description, thumb, url, callback) {
			if (typeof YCWeibo === "undefined") return msg.text('未安装微博插件！', 2);
			var args = {
				url: url,
				title: title,
				description: description,
				imageUrl: thumb,
				defaultText: ''
			};
			YCWeibo.shareToWeibo(function(){
				msg.text('分享成功！', 5);
				if (callback) callback();
			},function(reason){
				msg.text('分享失败：' + reason, 5);
			},args);
		}
	};
}])
.factory('share', ['$ionicActionSheet', 'shareTo', function($ionicActionSheet, shareTo) {
	return {
		//弹出分享
		pop: function(title, description, thumb, url, callback) {
			$ionicActionSheet.show({
				titleText: '与朋友们分享',
				buttons: [
					{ text: '分享到微信朋友圈' },
					{ text: '分享到微信好友' },
					{ text: '收藏到微信' },
					{ text: '分享到QQ空间' },
					{ text: '分享到QQ好友' },
					{ text: '收藏到QQ' }//,
					//{ text: '分享到微博' }
				],
				buttonClicked: function(index) {
					if (index === 0) shareTo.wechat(title, description, thumb, url, 1, callback);
					else if (index === 1) shareTo.wechat(title, description, thumb, url, 0, callback);
					else if (index === 2) shareTo.wechat(title, description, thumb, url, 2, callback);
					else if (index === 3) shareTo.qq(title, description, thumb, url, 1, callback);
					else if (index === 4) shareTo.qq(title, description, thumb, url, 0, callback);
					else if (index === 5) shareTo.qq(title, description, thumb, url, 2, callback);
					else if (index === 6) shareTo.weibo(title, description, thumb, url, callback);
					return true;
				}
			});
		}
	}
}]);
