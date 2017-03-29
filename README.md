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

新IOS热更修改：
```
vi platforms/ios/CordovaLib/Classes/Public/CDVCommandDelegateImpl.m
搜索：resourcepath
修改第1行增加：
    if ([self readRootPathStatus]) {
        return [self readRootPathStatus];
    } else {
        //之前代码
    }
下面增加：
- (NSString *)readRootPathStatus {
    NSString * fileName=[[self getAPPDirectory] stringByAppendingPathComponent:@"RootPath.plist"];
    NSLog(@"RootPath==>%@",fileName);
    NSDictionary * readDic=[[NSDictionary alloc] initWithContentsOfFile:fileName] ;
    if (readDic) {
        NSString *homeDir = [NSString stringWithFormat:@"%@/Library",NSHomeDirectory()];
        return [[NSString alloc] initWithFormat:@"%@%@",homeDir,[readDic objectForKey:@"path"]];
    } else {
        return nil;
    }
}
- (NSString *)getAPPDirectory{
    NSArray * paths=NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    return [paths objectAtIndex:0];
}
vi platforms/ios/CordovaLib/Classes/Public/CDVViewController.m
搜索：viewDidLoad
修改第3行增加：
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadWebView:) name:@"loadWebView" object:nil];
下面增加：
- (void)loadWebView:(NSNotification *)notification {
    NSURL *appURL = [self appUrl];
    NSLog(@"appURL------接收到更新时的地址------>%@",appURL);

    [CDVUserAgentUtil acquireLock:^(NSInteger lockToken) {
        _userAgentLockToken = lockToken;
        [CDVUserAgentUtil setUserAgent:self.userAgent lockToken:lockToken];
        if (appURL) {
            NSURLRequest* appReq = [NSURLRequest requestWithURL:appURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:20.0];
            [self.webViewEngine loadRequest:appReq];
        } else {
            NSString* loadErr = [NSString stringWithFormat:@"ERROR: Start Page at '%@/%@' was not found.", self.wwwFolderName, self.startPage];
            NSLog(@"%@", loadErr);

            NSURL* errorUrl = [self errorURL];
            if (errorUrl) {
                errorUrl = [NSURL URLWithString:[NSString stringWithFormat:@"?error=%@", [loadErr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]] relativeToURL:errorUrl];
                NSLog(@"%@", [errorUrl absoluteString]);
                [self.webViewEngine loadRequest:[NSURLRequest requestWithURL:errorUrl]];
            } else {
                NSString* html = [NSString stringWithFormat:@"<html><body> %@ </body></html>", loadErr];
                [self.webViewEngine loadHTMLString:html baseURL:nil];
            }
        }
    }];
}
```
android热更新修改文件 platforms/android/src/com/livexy/joke/MainActivity.java
```java

package com.livexy.joke;

import android.os.Bundle;
import org.apache.cordova.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import android.os.AsyncTask;
import android.os.Bundle;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

public class MainActivity extends CordovaActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//loadUrl(launchUrl);
		//Toast.makeText(this, getFilesDir().toString() + "/www", Toast.LENGTH_LONG).show();
		isExistFiles(getFilesDir().toString() + "/www");
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		android.os.Process.killProcess(android.os.Process.myPid());
	}

	public void isExistFiles(String path) {
		File file = new File(path);
		if (!file.exists()) {
			//Toast.makeText(this, getFilesDir().toString() + "/www 不存在", Toast.LENGTH_LONG).show();
			CopyFilesTask task = new CopyFilesTask();
			task.execute();
		} else {
			//Toast.makeText(this, getFilesDir().toString() + "/www 存在 直接显示", Toast.LENGTH_LONG).show();
			loadUrl("file://" + getFilesDir().toString() + "/www/index.html");
		}
	}

	class CopyFilesTask extends AsyncTask<Void, Integer, String> {
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
		}
		@Override
		protected String doInBackground(Void... params) {
			try {
				MainActivity.unZip(MainActivity.this, "www.zip", getFilesDir().toString());
			} catch (IOException e) {
				e.printStackTrace();
				//Toast.makeText(MainActivity.this, e.toString(), Toast.LENGTH_LONG).show();
			}
			return null;
		}
		@Override
		protected void onProgressUpdate(Integer... values) {
			super.onProgressUpdate(values);
		}
		@Override
		protected void onPostExecute(String result) {
			super.onPostExecute(result);
			//Toast.makeText(MainActivity.this, getFilesDir().toString() + "/www 解压成功 加载", Toast.LENGTH_LONG).show();
			loadUrl("file://" + getFilesDir().toString() + "/www/index.html");
		}
	}

	public static void unZip(Context context, String assetName,String outputDirectory) throws IOException {
        //创建解压目标目录
        File file = new File(outputDirectory);
        //如果目标目录不存在，则创建
        if (!file.exists()) {
            file.mkdirs();
        }
        InputStream inputStream = null;
        //打开压缩文件
        inputStream = context.getAssets().open(assetName);
        ZipInputStream zipInputStream = new ZipInputStream(inputStream);
        //读取一个进入点
        ZipEntry zipEntry = zipInputStream.getNextEntry();
        //使用1Mbuffer
        byte[] buffer = new byte[1024 * 1024];
        //解压时字节计数
        int count = 0;
        //如果进入点为空说明已经遍历完所有压缩包中文件和目录
        int num = 0;
        while (zipEntry != null) {
            //如果是一个目录
            if (zipEntry.isDirectory()) {
                //String name = zipEntry.getName();
                //name = name.substring(0, name.length() - 1);
                file = new File(outputDirectory + File.separator + zipEntry.getName());
                file.mkdir();
            } else {
                //如果是文件
                file = new File(outputDirectory + File.separator
                        + zipEntry.getName());
                //创建该文件
                file.createNewFile();
                FileOutputStream fileOutputStream = new FileOutputStream(file);
                while ((count = zipInputStream.read(buffer)) > 0) {
                    fileOutputStream.write(buffer, 0, count);
                }
                fileOutputStream.close();
            }
            //定位到下一个文件入口
            zipEntry = zipInputStream.getNextEntry();
            num++;
            System.out.println("正在解压---》第" + num + "个文件。");
        }
        zipInputStream.close();
    }
}
```
IOS老版本更新：platforms/ios/CordovaLib/Classes/CDVViewController.m
```
261 行增加:
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadWebView:) name:@"loadWebView" object:nil];
494 行增加：
/*
 *接收更新UI通知  执行重新加载
 */
- (void)loadWebView:(NSNotification *)notification {
    NSURL *appURL = [self appUrl];
    NSLog(@"appURL------接收到更新时的地址------>%@",appURL);

    [CDVUserAgentUtil acquireLock:^(NSInteger lockToken) {
        _userAgentLockToken = lockToken;
        [CDVUserAgentUtil setUserAgent:self.userAgent lockToken:lockToken];
        if (appURL) {
            NSURLRequest* appReq = [NSURLRequest requestWithURL:appURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:20.0];
            [self.webView loadRequest:appReq];
        } else {
            NSString* loadErr = [NSString stringWithFormat:@"ERROR: Start Page at '%@/%@' was not found.", self.wwwFolderName, self.startPage];
            NSLog(@"%@", loadErr);

            NSURL* errorUrl = [self errorUrl];
            if (errorUrl) {
                errorUrl = [NSURL URLWithString:[NSString stringWithFormat:@"?error=%@", [loadErr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]] relativeToURL:errorUrl];
                NSLog(@"%@", [errorUrl absoluteString]);
                [self.webView loadRequest:[NSURLRequest requestWithURL:errorUrl]];
            } else {
                NSString* html = [NSString stringWithFormat:@"<html><body> %@ </body></html>", loadErr];
                [self.webView loadHTMLString:html baseURL:nil];
            }
        }
    }];
}
```
IOS老版本更新：platforms/ios/CordovaLib/Classes/CDVCommandDelegatelmpl.m
```
48 行：
    //如果有下载更新 获取到更新后的路径
    if ([self readRootPathStatus]) {
        return [self readRootPathStatus];
    } else {//否则 获取原始路径
66 行：
    }
69 行：
- (NSString *)readRootPathStatus {
    NSString * fileName=[[self getAPPDirectory] stringByAppendingPathComponent:@"RootPath.plist"];
    NSLog(@"RootPath==>%@",fileName);
    NSDictionary * readDic=[[NSDictionary alloc] initWithContentsOfFile:fileName] ;
    if (readDic) {
        // 获取沙盒主目录路径
        NSString *homeDir = [NSString stringWithFormat:@"%@/Library",NSHomeDirectory()];
        return [[NSString alloc] initWithFormat:@"%@%@",homeDir,[readDic objectForKey:@"path"]];
    } else {
        return nil;
    }
}
- (NSString *)getAPPDirectory{
    NSArray * paths=NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    return [paths objectAtIndex:0];
}
```
