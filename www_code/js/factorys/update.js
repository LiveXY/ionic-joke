//下载更新
'use strict';

app.factory('update', ['$timeout', '$cordovaFile', '$q', '$location', 'msg', 'config', function($timeout, $cordovaFile, $q, $location, msg, config) {
	//下载并解压
	function download(url, destination) {
		var path = cordova.file.dataDirectory + 'www.zip';
		var d = new FileTransfer();
		d.onprogress = function(p){
			var progress = (p.loaded / p.total) * 100;
			$timeout(function(){ msg.loading('下载进度：' + parseInt(progress) + '%'); });
		};

		d.download(url, path, function(result) {
			zip.unzip(path, destination, function(result) {
				var appfile = 'www/ionic.app.min.js';
				$cordovaFile.readAsText(cordova.file.dataDirectory, appfile).then(function (result) {
					result = result.replace('"com.livexy.joke"', '"' + config.bundleid + '"');
					$cordovaFile.writeExistingFile(cordova.file.dataDirectory, appfile, result).then(function (result) {
						msg.success('更新完成，正在启动...', 5);
						$timeout(function(){ joke.setRootPath(destination + 'index.html'); }, 2000);
					});
				});
			}, function(p) { });
		}, function(err){
			msg.error('更新失败！', 5);
			$location.path('/tabs/joke');
		});
	};
	//复制初始目录
	function copyAppPath() {
		var d = $q.defer();
		$cordovaFile.checkDir(cordova.file.dataDirectory, "www").then(function (result) {
			d.resolve(result.nativeURL);
		}, function (error) {
			$cordovaFile.copyDir(cordova.file.applicationDirectory, "www", cordova.file.dataDirectory, "www").then(function (result) {
				d.resolve(result.nativeURL);
			}, function (error) {
				d.reject(error);
			});
		});
		return d.promise;
	};
	//显示所有目录
	function showPath() {
		for(var i in cordova.file) console.log('cordova.file:', i);
		console.log('cordova.file:applicationDirectory->:', cordova.file.applicationDirectory);
		console.log('cordova.file:applicationStorageDirectory->:', cordova.file.applicationStorageDirectory);
		console.log('cordova.file:dataDirectory->:', cordova.file.dataDirectory);
		console.log('cordova.file:cacheDirectory->:', cordova.file.cacheDirectory);
		console.log('cordova.file:externalApplicationStorageDirectory->:', cordova.file.externalApplicationStorageDirectory);
		console.log('cordova.file:externalDataDirectory->:', cordova.file.externalDataDirectory);
		console.log('cordova.file:externalCacheDirectory->:', cordova.file.externalCacheDirectory);
		console.log('cordova.file:externalRootDirectory->:', cordova.file.externalRootDirectory);
		console.log('cordova.file:tempDirectory->:', cordova.file.tempDirectory);
		console.log('cordova.file:syncedDataDirectory->:', cordova.file.syncedDataDirectory);
		console.log('cordova.file:documentsDirectory->:', cordova.file.documentsDirectory);
		console.log('cordova.file:sharedDirectory->:', cordova.file.sharedDirectory);
	};
	return {
		//下载更新
		download: function(url) {
			if (!window.cordova) return false;
			msg.loading('正在下载更新...');
			var destination = cordova.file.dataDirectory + 'www/';
			if (ionic.Platform.isAndroid())
				download(url, destination);
			else if (ionic.Platform.isIOS() || ionic.Platform.isIPad())
				copyAppPath().then(function(path){
					download(url, destination);
				}, function(){
					msg.error('更新失败！！', 5);
					$location.path('/tabs/joke');
				});
			else
				$location.path('/tabs/joke');
		}
	};
}]);
