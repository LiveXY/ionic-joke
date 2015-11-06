//指令
'use strict';

app.directive('imgLoaded', [
	function () {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var cssClass = attrs.imgLoaded;
				element.bind('load', function (e) {
					angular.element(element).addClass(cssClass);
				});
			}
		}
	}
]).directive('ionItem', ["$timeout",
	function ($timeout) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {
				if (attrs.ngClick || attrs.click) {
					element.bind('click', function (e) {
						angular.element(element).addClass('clicked');
						$timeout(function(){ angular.element(element).removeClass('clicked'); }, 200);
					});
				}
			}
		}
	}
]).directive('likeAnimated', ["$timeout", "util",
	function ($timeout, util) {
		var index = 0;
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var cssClass = attrs.likeAnimated;
				element.bind('click', function (e) {
					var type = util.rand(1, 6), img = util.rand(1, 8), id = Math.random().toString().substr(2), left = util.rand(-20, 20), rotate = index % 2 == 1 ? 'Right' : 'Left';
					if (this.tagName == 'IMG') {
						element.parent().prepend('<img id="{3}" src="img/like/{4}_{0}.png" class="{1}" style="position:absolute;left:{2}px;top:{5}px;z-index:999" />'.format(img, 'likeAnimated zoomIn', e.clientX-15-left, id, type, e.clientY-30));
					} else {
						element.parent().parent().prepend('<img id="{3}" src="img/like/{4}_{0}.png" class="{1}" style="position:absolute;left:{2}px;top:0px;z-index:999" />'.format(img, 'likeAnimated zoomIn', e.clientX-15-left, id, type));
					}
					var obj = angular.element(document.getElementById(id));
					$timeout(function(){ obj.addClass('rotate'+rotate); }, 200);
					$timeout(function(){ obj.addClass('fadeOutUp'+rotate); }, 300);
					$timeout(function(){ angular.element(document.getElementById(id)).remove(); }, 3000);
					index++;
				});
			}
		}
	}
]);
