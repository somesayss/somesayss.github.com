"use strict";
/**
 * 2015.10.8
 * 对ES的增强
 * version: 2.0.0
 * 更加优美的构造，入口的统一，ES6语法
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define(function (require, exports) {

	// 依赖
	var limitDom = require('./limit-dom');

	// 变量
	var limit = {};
	var WIN = window;
	var DOC = window.document;
	var BODY = document.body;
	var arrayProto = Array.prototype;

	// 确定全局是否用兼容方法

	var limitFixed = function (WIN, BODY) {
		var flag = WIN.limitUseFixed || BODY.getAttribute('data-limit-fixed') === 'true';
		// IE8下delete window下的属性会报错
		try {
			delete WIN.limitUseFixed;
		} catch (e) {
			WIN.limitUseFixed = void 0;
		};
		return flag;
	}(WIN, BODY);

	// 自有属性
	var defineProperty = Object.defineProperty;
	var is = Object.is;
	var assign = Object.assign;
	var keys = Object.keys;
	var concat = arrayProto.concat;
	var slice = arrayProto.slice;

	// 传递器

	var K = function K() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return args.length <= 1 ? args[0] : args;
	};

	// 空函数
	var E = function E() {};

	// 空对象
	var O = {};

	// 获取属性
	var getProp = function getProp() {
		var obj = arguments.length <= 0 || arguments[0] === undefined ? O : arguments[0];
		var key = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
		var deVal = arguments[2];
		return obj[key] === void 0 ? deVal : obj[key];
	};

	// 定义:priority,fixed,when,format
	var defineIt = function defineIt(name) {
		var config = arguments.length <= 1 || arguments[1] === undefined ? O : arguments[1];

		var priority = void 0,
		    fixed = void 0,
		    when = void 0,
		    format = void 0,
		    value = void 0;
		if (config.value === void 0) {
			// 新方法
			priority = getProp(config, 'priority', K);
			// 兼容性方法
			fixed = getProp(config, 'fixed', K);
			// 条件 [默认为false]
			when = getProp(config, 'when', E);
			// 格式化参数
			format = getProp(config, 'format', K);
			// 主函数
			value = function value() {
				var args = concat.call(arrayProto, format.apply(undefined, arguments));
				return limitFixed && when.apply(undefined, _toConsumableArray(args)) ? priority.apply(undefined, _toConsumableArray(args)) : fixed.apply(undefined, _toConsumableArray(args));
			};
		} else {
			value = config.value;
		};
		if (defineProperty) {
			defineProperty(limit, name, {
				value: value,
				writable: false, //只读
				enumerable: true, //被枚举
				configurable: false //更改内部属性
			});
		} else {
				if (limit[name] !== void 0) {
					throw new TypeError('Cannot redefine property: ' + name);
				};
				limit[name] = value;
			};
		return value;
	};

	// 传递器
	defineIt('K', { value: K });

	// 获取属性
	defineIt('getProp', { value: getProp });

	// --工具方法-- //

	// --对象方法-- //
	// ES6: Object.is();

	// ES6: Object.assign();
	defineIt('assign', {
		when: function when() {
			return !!assign;
		},
		priority: function priority() {
			return assign.apply(undefined, arguments);
		},
		fixed: function fixed() {
			console.log(123);
		}
	});

	// ES5: Object.keys
	defineIt('keys', {
		when: function when() {
			return !!keys;
		},
		priority: function priority() {
			return keys.apply(undefined, arguments);
		},
		fixed: function fixed() {}
	});

	// mix: extend

	// 返回主体
	return limit;
});