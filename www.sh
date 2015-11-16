#!/bin/sh

param=$1
pf=$2

currPath=$(pwd)
sourcePath="$currPath/www_code"
wwwPath="$currPath/jokeApp/www"

# 增加操作权限
sudo chmod -R a+rw "$currPath/jokeApp/platforms/android/assets/www/"
sudo chmod -R a+rw "$currPath/jokeApp/platforms/ios/www/"

# 安装uglifyjs
cmd=`which uglifyjs 2>&1`
ret=$?
if [ $ret -eq 0 ] && [ -x "$cmd" ]; then
	echo 'uglifyjs 已安装！'
else
	npm install uglify-js -g
	echo 'uglifyjs 安装成功！'
fi

# 安装uglifycss
cmd=`which uglifycss 2>&1`
ret=$?
if [ $ret -eq 0 ] && [ -x "$cmd" ]; then
	echo 'uglifycss 已安装！'
else
	npm install uglifycss -g
	echo 'uglifycss 安装成功！'
fi

# 合并所有js文件
rm -rf $wwwPath
mkdir $wwwPath
cp "$sourcePath/index_www.html" "$wwwPath/index.html"
cp -R "$sourcePath/lib" "$wwwPath/"
cp -R "$sourcePath/img" "$wwwPath/"
cp "$sourcePath/js/extend.js" "$wwwPath/ionic.app.js"
cat "$sourcePath/js/ionic.app.js" >> "$wwwPath/ionic.app.js"
cat "$sourcePath/js/filters.js" >> "$wwwPath/ionic.app.js"
find $sourcePath/js/templates/* | xargs cat >> "$wwwPath/ionic.app.js"
find $sourcePath/js/services/* | xargs cat >> "$wwwPath/ionic.app.js"
find $sourcePath/js/factorys/* | xargs cat >> "$wwwPath/ionic.app.js"
find $sourcePath/js/directives/* | xargs cat >> "$wwwPath/ionic.app.js"
find $sourcePath/js/controllers/* | xargs cat >> "$wwwPath/ionic.app.js"
find $wwwPath/ionic.app.js | xargs perl -pi -e "s|'use strict';||g"
if [ "$pf" != '' ]; then
	pf="-$pf"
	find $wwwPath/ionic.app.js | xargs perl -pi -e "s|'cn.org.smhc.moodthermo'|'cn.org.smhc.moodthermo$pf'|g"
fi
echo '生成文件成功！'

# 压缩js文件
uglifyjs "$wwwPath/ionic.app.js" -m -o "$wwwPath/ionic.app.min.js"
rm -f $wwwPath/ionic.app.js

# 压缩css文件
cat "$sourcePath/css/ionic.app.css" >> "$wwwPath/ionic.app.css"
find $wwwPath/ionic.app.css | xargs perl -pi -e "s|../img/|img/|g"
uglifycss "$wwwPath/ionic.app.css" > "$wwwPath/ionic.app.min.css"
rm -f $wwwPath/ionic.app.css
echo '压缩文件成功！'

# 复制到各平台
cp -Rf "$wwwPath/lib" "$currPath/jokeApp/platforms/ios/www/"
cp -Rf "$wwwPath/img" "$currPath/jokeApp/platforms/ios/www/"
cp -f "$wwwPath/index.html" "$currPath/jokeApp/platforms/ios/www/"
cp -f "$wwwPath/ionic.app.min.js" "$currPath/jokeApp/platforms/ios/www/"
cp -f "$wwwPath/ionic.app.min.css" "$currPath/jokeApp/platforms/ios/www/"

cp -Rf "$wwwPath/lib" "$currPath/jokeApp/platforms/android/assets/www/"
cp -Rf "$wwwPath/img" "$currPath/jokeApp/platforms/android/assets/www/"
cp -f "$wwwPath/index.html" "$currPath/jokeApp/platforms/android/assets/www/"
cp -f "$wwwPath/ionic.app.min.js" "$currPath/jokeApp/platforms/android/assets/www/"
cp -f "$wwwPath/ionic.app.min.css" "$currPath/jokeApp/platforms/android/assets/www/"
rm -f "$currPath/jokeApp/platforms/android/assets/www.zip"
cd "$currPath/jokeApp/platforms/android/assets/"
zip -r www.zip www/
echo '文件已复制到各平台！'

cd "$currPath/jokeApp"
if [ "$param" == 'b' ] && [ "$pf" == '' ]; then
	# 编译各平台
	sudo ionic build android
	sudo ionic build ios

	# 增加操作权限
	sudo chmod -R a+rw "$currPath/jokeApp/platforms/android/assets/www/"
	sudo chmod -R a+rw "$currPath/jokeApp/platforms/ios/www/"
fi

if [ "$param" == 'r' ] && [ "$pf" == '' ]; then
	# 编译各平台
	sudo ionic build android
	sudo ionic build ios

	# 增加操作权限
	sudo chmod -R a+rw "$currPath/jokeApp/platforms/android/assets/www/"
	sudo chmod -R a+rw "$currPath/jokeApp/platforms/ios/www/"
	"$currPath/jokeApp/platforms/ios/cordova/run"
fi
