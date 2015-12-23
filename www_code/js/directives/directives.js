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
])
.directive('ionItem', ["$timeout",
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
])
.directive('ionSelect', ["$timeout", "$ionicPopover", "$ionicScrollDelegate",
	function ($timeout, $ionicPopover, $ionicScrollDelegate) {
		return {
			restrict: 'AE',
			replace: true,
			scope: { source: "=", ngModel: "=", ngSave: "&" },
			require: 'ngModel',
			template: '\
			<div class="item item-input item-more">\
				<div class="item-text">{{text}}</div>\
				<i class="ion-ios-arrow-right" style="top:25%"></i>\
				<span class="icon {{icoClass}}" style="color:#4DCEEB;font-size:{{icoSize}}px;"></span>\
				<label>{{title}}</label>\
			</div>',
			link: function(scope, element, attrs, ngModelController) {
				var scrolling, currentItem, currentID;
				scope.cancelText = attrs.cancelText || '取消';
				scope.okText = attrs.okText || '确定';
				scope.title = attrs.title || '';
				scope.icoSize = attrs.icoSize || 35;
				scope.icoClass = attrs.icoClass || 35;
				scope.text = attrs.placeholder || '';
				element.bind('click', function (e) {
					angular.element(element).addClass('clicked');
					$timeout(function(){ angular.element(element).removeClass('clicked'); }, 200);
					open();
				});
				scope.$watch('source', function(value) { scope.data = value; });
				scope.$watch('ngModel',function(value) {
					currentID = value;
					var index = currentIndex();
					setScroll('selectHandle', index);
				});
				function currentIndex() {
					var index = 0;
					if (currentID) angular.forEach(scope.data, function(item, i) {
						if (item.id == currentID) {
							index = i;
							currentItem = item;
						}
						if (currentItem) {
							scope.text = currentItem.name;
						}
					});
					return index;
				}

				scope.select = $ionicPopover.fromTemplateUrl('select1.html', { scope: scope }).then(function(popover) { scope.select = popover; });

				function open() {
					var index = currentIndex();
					setScroll('selectHandle', index);
					scope.select.show();
				};
				scope.close = function() { scope.select.hide(); };
				scope.save = function() {
					if (currentItem) {
						ngModelController.$setViewValue(currentItem.id);
						scope.text = currentItem.name;
						scope.ngSave && scope.ngSave();
					}
					scope.close();
				};
				scope.selectScroll = function(handle) {
					$timeout.cancel(scrolling);
					var length = scope.data.length
					var top = $ionicScrollDelegate.$getByHandle(handle).getScrollPosition().top;
					var index = Math.round(top / 36);
					if (index < 0) index = 0;
					if (index > length - 1) index = length-1;
					if (length>0 && top === index*36) currentItem = scope.data[index];
					if (length>0 && top !== index*36) {
						scrolling = $timeout(function () {
							$ionicScrollDelegate.$getByHandle(handle).scrollTo(0,index*36,true);
						}, 100);
					}
				}
				function setScroll(handle, index) {
					$ionicScrollDelegate.$getByHandle(handle).scrollTo(0,index*36,true);
				}
				scope.$on('$destroy', function() { scope.select.remove(); });
			}
		}
	}
])
.directive('ionTags', ['$timeout', '$parse', function($timeout, $parse){
	return {
		restrict: 'AE',
		replace: true,
		scope : {
			source : "=",
			ngModel : "="
		},
		require: 'ngModel',
		template: '<div class="ion-tags clearfix"></div>',
		link: function(scope, element, attrs, ngModelController) {
			var data = [];
			scope.$watch('source',function(value) {
				if (!value) return false;
				console.log('source', value);
				for(var i in value)  element.append(itemT.format(value[i].id, value[i].title));
				childs = element.children();
				angular.forEach(childs, function(item) {
					angular.element(item).bind('click', function (e) {
						var me = angular.element(this);
						if (me.hasClass('active')) {
							me.removeClass('active');
							var id = me.attr('tid');
							var index = data.indexOf(id);
							if (index != -1) data.splice(index, 1);
						} else {
							me.addClass('active');
							var id = me.attr('tid');
							if (data.indexOf(id) == -1) data.push(id);
						}
						ngModelController.$setViewValue(data);
					});
				});
			});
			scope.$watch('ngModel',function(value) {
				if (!value) return false;
				data = value;
				angular.forEach(childs, function(item) {
					var me = angular.element(item), tid = me.attr('tid');
					me.removeClass('active');
					angular.forEach(value, function(id) {
						if (id == tid) me.addClass('active');
					});
				});
			});
			var childs = null, itemT = '<a class="tag" tid="{0}">{1}</a>';
		}
	}
}])
.directive('likeAnimated', ["$timeout", "util",
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
