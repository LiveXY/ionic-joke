#!/bin/sh

param=$1
pf=$2

if [ "$pf" != '' ]; then
	./www.sh "$param" "$pf"
	pf=".$pf"
fi

currPath=$(pwd)
androidPath="$currPath/jokeApp/platforms/android"
apkFile="joke$pf.apk"

if [ "$param" == 'b' ]; then
	# 请理文件
	sudo rm -f "$androidPath/build/outputs/apk/android-release-signed.apk"
	sudo rm -f "$androidPath/build/outputs/apk/android-release-unsigned.apk"
	sudo rm -f "$androidPath/build/outputs/apk/$apkFile"

	cd jokeApp/
	# 生成android apk文件
	sudo ionic build --release android

	# 签名，使用 tsa 保证时间
	sudo jarsigner -tsa http://timestamp.digicert.com -sigalg SHA1withRSA -digestalg SHA1 -keystore "$androidPath/joke-android.keystore" -storepass zzjoke -signedjar "$androidPath/build/outputs/apk/android-release-signed.apk" "$androidPath/build/outputs/apk/android-release-unsigned.apk" joke

	echo "正在优化apk文件..."
	# 对齐，减小内存使用，必须在签名后完成
	# 使用 google 提供的高压缩比 zlib
	sudo "$ANDROID_HOME/build-tools/22.0.1/zipalign" -z 4 "$androidPath/build/outputs/apk/android-release-signed.apk" "$androidPath/build/outputs/apk/$apkFile"
fi

echo "安装包已生成：$androidPath/build/outputs/apk/$apkFile"

# 安装到设备
adb install "$androidPath/build/outputs/apk/$apkFile"
