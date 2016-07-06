"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports) {

	// 依赖
	var limit = require('common/limit2.0');

	var Events = function () {
		function Events() {
			_classCallCheck(this, Events);
		}

		_createClass(Events, [{
			key: 'add',
			//单个注册
			value: function add(type, callback) {
				type = limit.toString(type);
				callback = limit.cb(callback);
				var me = this,
				    meEvents = me.__events__,
				    meEventsSpace = void 0,
				    meEventsNameSpace = void 0,
				    ns = getNameSpace(type);
				if (ns) {
					//初始化容器
					meEvents || (meEvents = me.__events__ = {});
					//初始化事件容器
					(meEventsSpace = meEvents[ns.eventType]) || (meEventsSpace = meEvents[ns.eventType] = []);
					meEventsSpace.push(callback);
					if (ns.nameSpace) {
						//初始化事件命名空间容器
						(meEventsNameSpace = meEventsSpace[ns.nameSpace]) || (meEventsNameSpace = meEventsSpace[ns.nameSpace] = []);
						meEventsNameSpace.push(callback);
					};
				};
				return me;
			}
			//单个销毁

		}, {
			key: 'remove',
			value: function remove(type) {
				type = limit.toString(type);
				var me = this,
				    meEvents = me.__events__,
				    meEventsSpace = void 0,
				    meEventsNameSpace = void 0,
				    ns = getNameSpace(type);
				if (ns && meEvents && (meEventsSpace = meEvents[ns.eventType])) {
					if (ns.nameSpace) {
						(meEventsNameSpace = meEventsSpace[ns.nameSpace]) && limit.forEach(meEventsNameSpace, function (val) {
							limit.remove(meEventsSpace, val);
						});
						delete meEventsSpace[ns.nameSpace];
					} else {
						delete meEvents[ns.eventType];
					};
				};
			}
			// 触发

		}, {
			key: 'emit',
			value: function emit(type) {
				type = limit.toString(type);
				var me = this,
				    meEvents = me.__events__,
				    meEventsSpace = void 0,
				    meEventsNameSpace = void 0,
				    ns = getNameSpace(type);
				if (ns && meEvents && (meEventsSpace = meEvents[ns.eventType])) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					//存在事件的命名空间
					if (ns.nameSpace) {
						return (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args);
					} else {
						return eachTrigger(meEventsSpace, me, args);
					}
				}
				return true;
			}
			//多次

		}, {
			key: 'on',
			value: function on(type, callback) {
				type = limit.toString(type);
				var me = this;
				limit.forEach(type.split(','), function (a) {
					return me.add(a, callback);
				});
				return me;
			}
			//多次

		}, {
			key: 'off',
			value: function off(type) {
				type = limit.toString(type);
				var me = this;
				limit.forEach(type.split(','), function (a) {
					return me.remove(a);
				});
				return me;
			}
		}]);

		return Events;
	}();

	;

	//获取命名空间
	var REX = /(\w+)\.?(.*)/;
	var getNameSpace = function getNameSpace(type) {
		if (REX.test(type)) {
			return {
				eventType: RegExp.$1,
				nameSpace: RegExp.$2
			};
		};
	};

	//循环触发
	var eachTrigger = function eachTrigger(arr, context, args) {
		var val = true;
		limit.forEach(arr.slice(0), function (f) {
			f.apply(context, args) === false && (val = false);
		});
		return val;
	};

	return Events;
});