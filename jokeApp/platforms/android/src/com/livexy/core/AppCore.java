package com.livexy.core;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;

public class AppCore extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {

		if (action.equals("setRootPath")) {

			System.out.println("哈哈哈哈哈哈哈哈哈哈哈哈哈哈===》"+args.toString());

        } else {
            return false;
        }
        return true;
	}

}
