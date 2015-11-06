# ionic-joke
猪猪笑话－搞笑段子、短信、图片

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
sudo cordova plugin add cordova-plugin-device
sudo cordova plugin add cordova-plugin-splashscreen
sudo cordova plugin add cordova-plugin-whitelist
sudo cordova plugin add cordova-plugin-statusbar
sudo cordova plugin add org.apache.cordova.network-information
sudo cordova plugin add org.apache.cordova.file
sudo cordova plugin add org.apache.cordova.file-transfer
sudo cordova plugin add cordova-plugin-zip
sudo cordova plugin add hu.dpal.phonegap.plugins.uniquedeviceid
sudo cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
```
