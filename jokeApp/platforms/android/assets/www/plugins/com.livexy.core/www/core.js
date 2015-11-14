cordova.define("com.livexy.core.AppCore", function(require, exports, module) { var exec = require("cordova/exec");

module.exports = {
	setRootPath: function (path) {
		exec(null, null, "AppCore", "setRootPath", [path]);
	}
};

});
