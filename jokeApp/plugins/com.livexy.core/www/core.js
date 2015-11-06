var exec = require("cordova/exec");

module.exports = {
	setRootPath: function (path) {
		exec(null, null, "AppCore", "setRootPath", [path]);
	}
};
