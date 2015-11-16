
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
