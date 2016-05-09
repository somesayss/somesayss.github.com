"use strict";
/**
 * 2015.10.8
 * 对ES的增强
 * version: 2.0.0
 * 更加优美的构造，入口的统一，ES6语法
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define(function (require, exports) {
	var _this = this;

	// 变量
	var limit = {};
	var WIN = window;
	var DOC = window.document;
	var BODY = document.body;
	var objectProto = Object.prototype;
	var arrayProto = Array.prototype;

	// 确定全局是否用兼容方法

	limit.limitFixed = false;
	limit.logClosed = false;

	// 自有属性
	var defineProperty = Object.defineProperty;
	var is = Object.is;
	var assign = Object.assign;
	var keys = Object.keys;
	var toString = objectProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var concat = arrayProto.concat;
	var slice = arrayProto.slice;
	var forEach = arrayProto.forEach;

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
				return !limit.limitFixed && when.apply(undefined, _toConsumableArray(args)) ? priority.apply(undefined, _toConsumableArray(args)) : fixed.apply(undefined, _toConsumableArray(args));
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

	// --错误日志-- //
	// 日志颜色
	var logColor = {
		'log': 'background:#333;margin-left:11px;padding-right:17px;',
		'error': 'background:#F00;padding-right:3px;',
		'warn': 'background:#F70;margin-left:11px;padding-right:10px;'
	};

	// 错误提醒
	var typeWarn = {
		toString: function toString(obj) {
			return log('warn', obj, 'change into', '\'' + obj + '\'', 'limit.toString is called');
		},
		toArray: function toArray(obj) {
			return log('warn', obj, 'change into []', 'limit.toArray is called');
		},
		formatDate: function formatDate(obj) {
			return log('warn', 'timestamp:', timestamp, 'date:', date, 'limit.formatDate is called');
		},
		bind: function bind(obj) {
			return log('warn', fun, 'type is not function, limit.bind is called');
		}
	};

	// log
	defineIt('log', {
		value: function value() {
			if (limit.logClosed) return;

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			var type = args.shift(),
			    con = console || O,
			    log = void 0,
			    isChrome = WIN.chrome;
			// 对type的处理可选值 'error'[默认]|'log'|'warn'
			// 这里可以优化用
			if (!contains(['error', 'log', 'warn'], type)) {
				args.unshift(type);
				type = 'error';
			};
			log = con[type] || K;
			// IE10下的IE8调试模式，console.log是个对象 纯IE8下 log = K;
			try {
				isChrome && args.unshift(logColor[type] + 'color:#FFF;padding-left:3px;border-radius:3px;');
				args.unshift((isChrome ? '%c' : '') + 'limitJS ' + type + ':');
				log.apply(con, args);
			} catch (e) {
				log('日志 ', args);
			};
		}
	});

	// --检查参数-- //
	// 如果是null undefined 返回空对象
	var checkTargetNoEqualNull = function checkTargetNoEqualNull(target) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		return target == null ? [{}].concat(args) : [target].concat(args);
	};

	// --判定方法-- //
	// 是否是DOM元素
	defineIt('isElement', { value: function value(n) {
			return !!n && n.nodeType === 1;
		} });

	// 判断是否是docuemtn
	defineIt('isDocument', { value: function value(n) {
			return !!n && n.nodeType === 9;
		} });

	// 判断是否是window
	defineIt('isWin', { value: function value(n) {
			return !!n && n.window === n && n.self == n;
		} });

	// 是否是未定义undefined
	defineIt('isUndefined', { value: function value(n) {
			return n === void 0;
		} });

	// 是否是定义
	defineIt('isDefined', { value: function value(n) {
			return !isUndefined(n);
		} });

	// 是否是空null
	defineIt('isNull', { value: function value(n) {
			return n === null;
		} });

	// 是否是函数function
	defineIt('isFunction', { value: function value(n) {
			return typeof n === 'function';
		} });

	// 是否是布尔boolean
	defineIt('isBoolean', { value: function value(n) {
			return n === true || n === false || toString.call(n) === '[object Boolean]';
		} });

	// 是否是这些[string number array data regexp error]对象
	'String,Number,Array,Date,RegExp,Error,Math'.replace(/\w+/g, function (k) {
		return defineIt('is' + k, { value: function value(n) {
				return toString.call(n) === '[object ' + k + ']';
			} });
	});

	// 是否是对象 除了5种基本类型以外都是对象
	defineIt('isObject', { value: function value(n) {
			return limit.isFunction(n) || (typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && !!n;
		} });

	// 是否是参数
	defineIt('isArguments', { value: function value(n) {
			return has(n, 'callee');
		} });

	// string array arguments nodeList jObject window[排除] function[排除]
	defineIt('isArrayLike', { value: function value(n) {
			return !!n && limit.isNumber(n.length) && !limit.isFunction(n) && !limit.isWin(n);
		} });

	// 是否是NaN
	defineIt('isNaN', {
		when: function when() {
			return !!Number.isNaN;
		},
		priority: function priority() {
			return Number.isNaN.apply(Number, arguments);
		},
		fixed: function fixed(n) {
			return limit.isNumber(n) && isNaN(n);
		}
	});

	// 是否是有限的
	defineIt('isFinite', {
		when: function when() {
			return !!Number.isFinite;
		},
		priority: function priority() {
			return Number.isFinite.apply(Number, arguments);
		},
		fixed: function fixed(n) {
			return limit.isNumber(n) && isFinite(n);
		}
	});

	// 是否为整数
	defineIt('isInteger', {
		when: function when() {
			return !!Number.isInteger;
		},
		priority: function priority() {
			return Number.isInteger.apply(Number, arguments);
		},
		fixed: function fixed(n) {
			return limit.isFinite(n) && Math.floor(n) === n;
		}
	});

	// 是否为安全整数
	defineIt('isSafeInteger', {
		when: function when() {
			return !!Number.isSafeInteger;
		},
		priority: function priority() {
			return Number.isSafeInteger.apply(Number, arguments);
		},
		fixed: function fixed(n) {
			return limit.isInteger(n) && -9007199254740992 < n && n < 9007199254740992;
		}
	});

	// --工具方法-- //

	// 私有遍历
	defineIt('_loop', {
		value: function value(obj, iterator, context, isBreak, begin) {
			// 循环遍历
			var target = limit._getLoopKey(obj),
			    key = void 0,
			    num = ~ ~begin,
			    len = target.length;
			for (; num < len; num++) {
				key = target[num];
				if (iterator.call(context, obj[key], key, obj) === false && isBreak) break;
			};
		}
	});

	// 获取键值
	defineIt('_getLoopKey', { value: function value(obj) {
			return limit.isArrayLike(obj) ? limit.keys(limit.toArray(obj)) : limit.keys(obj);
		} });

	// 静态判定
	defineIt('has', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(n, k) {
			return hasOwnProperty.call(n, k);
		}
	});

	// 确定是函数
	defineIt('cb', { value: function value(callback) {
			return limit.isFunction(callback) ? callback : K;
		} });

	// 遍历
	defineIt('forin', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj, iterator, context) {
			for (var key in obj) {
				iterator.call(context, obj[key], key, obj);
			};
		}
	});

	// 循环
	defineIt('each', {
		format: function format(obj, iterator, context) {
			return [obj, limit.cb(iterator), context];
		},
		when: function when(obj) {
			return isArrayLike(obj) && !!forEach;
		},
		priority: function priority(obj, iterator, context) {
			return forEach.call(obj, function (val, key) {
				iterator.call(_this, val, '' + key);
			}, context);
		},
		value: function value(obj, iterator, context) {
			return limit._loop(obj, iterator, context);
		}
	});

	// --对象方法-- //
	// ES6: Object.is();
	defineIt('is', {
		when: function when() {
			return !!is;
		},
		priority: function priority() {
			return is.apply(undefined, arguments);
		},
		fixed: function fixed() {}
	});

	// ES6: Object.assign();
	defineIt('assign', {
		when: function when() {
			return !!assign;
		},
		priority: function priority() {
			return assign.apply(undefined, arguments);
		},
		format: checkTargetNoEqualNull,
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
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			var arr = [];
			forin(obj, function (val, key) {
				return has(obj, key) && arr.push(key);
			});
			return arr;
		}
	});

	// mix: extend
	defineIt('extend', {
		format: checkTargetNoEqualNull,
		fixed: function fixed() {
			console.log(123);
		}
	});

	// --数组-- //
	// toArray
	defineIt('toArray', {
		value: function value(obj) {
			// 如果是数组原始返回
			if (limit.isArray(obj)) {
				return obj;
			}
			// 如果是类数组对象的话就格式化数组
			else if (limit.isArrayLike(obj)) {
					return slice.call(obj);
				} else {
					return typeWarn.toArray(obj), [];
				};
		}
	});

	// forEach

	//

	// 返回主体
	return limit;
});