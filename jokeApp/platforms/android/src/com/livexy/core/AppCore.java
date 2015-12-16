package com.livexy.core;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class AppCore extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {

		if (action.equals("setRootPath")) {

			String urlString = args.toString().substring(2, args.toString().indexOf("\"]"));
            System.out.println("========接收到更新啦========》" + urlString);

            //从新刷新UI
            CordovaActivity cActivity = (CordovaActivity) this.cordova.getActivity();
            cActivity.loadUrl(urlString);

            callbackContext.success();

        } else {
            return false;
        }
        return true;
	}

}
