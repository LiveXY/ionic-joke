//过滤器
'use strict';

//安全HTML
app.filter('toSafeHtml', ['$sce', function ($sce) {
    return function (text) {
        text = text.replace(/\n/g, '<br>');
        return $sce.trustAsHtml(text);
    };
}])
//安全HTML
.filter('safeHtml', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}])
//安全URL
.filter('safeUrl', ['$sce', function ($sce) {
	return function (url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);
