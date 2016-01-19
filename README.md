# ionic-joke
```
猪猪笑话－笑话,段子,短信,搞笑,爆笑,励志,幽默,冷笑话,开心,娱乐,成人笑话,好心情
猪猪笑话精选大量最新笑话，汇集互联网上各类新鲜流行的笑话段子，提供大量经典笑话、幽默笑话、成人笑话、爆笑笑话、冷笑话等，让你每天笑一笑，学习工作没烦恼，能给您带来轻松快乐的心情。
IOS下载地址：https://itunes.apple.com/cn/app/dared/id1059711002
ANDROID下载地址：http://a.app.qq.com/o/simple.jsp?pkgname=com.livexy.joke
```
====================================================
先下载安装nodejs:
```
https://nodejs.org/
安装ionic cordova：
sudo npm install -g ionic cordova -d

cordova -v
ionic -v
npm info cordova
npm info ionic
sudo npm update -g cordova -d

sudo ionic platform update android
sudo ionic platform update ios
```
====================================================
安装android运行环境,下载安装androidSDK：
```
https://developer.android.com/sdk/index.html
windows环境变量配置：
ANDROID_HOME=C:\Program Files (x86)\Android\android-sdk
ANDROID_PLATFORM_TOOLS=C:\Program Files (x86)\Android\android-sdk\platform-tools
ANDROID_SDK_HOME=C:\Program Files (x86)\Android\android-sdk
ANDROID_TOOLS=C:\Program Files (x86)\Android\android-sdk\tools
下载解压ANT:
https://ant.apache.org/bindownload.cgi
ANT环境变量:
ANT_HOME=C:\apache-ant-1.9.4
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_20
PATH=C:\ProgramData\Oracle\Java\javapath;C:\nodejs\;%ANDROID_HOME%;%JAVA_HOME%\bin;%ANT_HOME%\bin;%ANDROID_PLATFORM_TOOLS%;
```
====================================================
mac环境变量配置：
```
vi ~/.bash_profile
export ANDROID_HOME=~/android-sdk
export PATH=${PATH}:~/android-sdk/tools
export PATH=${PATH}:~/android-sdk/platform-tools
source ~/.bash_profile
```
====================================================
创建项目：
```
sudo ionic start -a 猪猪笑话 -i com.livexy.joke jokeApp blank
cd jokeApp
增加平台支持：
sudo ionic platform add android
sudo ionic platform add ios
编译项目
sudo ionic build android
sudo ionic build ios
```
====================================================
安装插件：
```
sudo cordova plugin add com.ionic.keyboard
sudo cordova plugin add cordova-plugin-console
sudo cordova plugin add cordova-plugin-splashscreen
sudo cordova plugin add cordova-plugin-whitelist
sudo cordova plugin add cordova-plugin-statusbar
sudo cordova plugin add org.apache.cordova.network-information
sudo cordova plugin add org.apache.cordova.file
sudo cordova plugin add org.apache.cordova.file-transfer
sudo cordova plugin add cordova-plugin-zip
sudo cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
sudo cordova plugin add ../plugins_code/com.livexy.core
sudo cordova plugin add ../plugins_code/cordova-plugin-device
sudo cordova plugin add ../plugins_code/jpush-phonegap-plugin
sudo cordova plugin add https://github.com/xu-li/cordova-plugin-wechat --variable wechatappid=wx4d76cc65246e7331
sudo cordova plugin add https://github.com/iVanPan/Cordova_QQ.git --variable QQ_APP_ID=1104978512
```
====================================================
www_code/js/services/config.js 手动添加:
```
//配置配置
'use strict';

//配置基础数据
app.constant('config', {
	vid: 版本号, vname: '版本名称', bundleid: '',
	refresh: {},
	api: 'your site url',
	apiTimeout: 30 * 1000
})
//配置白名单
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'your site url'
	]);
}]);

```
====================================================
生成icon/splash:
```
./resources.sh
```
====================================================
生成www:
```
./www.sh #只压缩复制文件到各平台
./www.sh b #只压缩复制文件到各平台并编译
```
====================================================
生成android平台apk文件:
```
./android-release.sh #安装到手机
./android-release.sh b #编译并安装到手机
./android-release.sh b 渠道名 #编译各渠道并安装到手机
```
====================================================
android市场：
```
上线：
http://a.app.qq.com/o/simple.jsp?pkgname=com.livexy.joke
http://open.qq.com
http://open.wandoujia.com/home/myapp
https://open.weixin.qq.com/
http://dev.anzhi.com/
http://dev.360.cn/mod/mobile/list
http://developer.meizu.com/console/apps/app/list
http://developer.huawei.com/cn/consumer/devunion/ui/index.html
http://app.baidu.com/apps
搜录
http://dev.eoemarket.com/Index/info
http://zhushou.sogou.com/open/user/auth/index.html?agree=1

http://zhanzhang.baidu.com/site/index
审核中
http://dev.xiaomi.com/index
http://dev.gfan.com/Aspx/DevApp/LoginUser.aspx
http://www.kaiqi.com/user/goUserInfo.action
不通过
http://dev.pp.cn/
http://dev.appchina.com/market/dev/main.action
http://dev.mumayi.com/user/index
http://www.nduoa.com/developer
http://open.lenovo.com/developer/getallclaimedapps.jspx
```
