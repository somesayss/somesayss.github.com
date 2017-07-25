"use strict";
/**
 * 2017.2.4
 * version: 2.2.0
 * 增加了日志缓存
 * 增加了 limit.parseInt 替换 ~~ 操作符
 * 增加了 Map 类 使用Map重构了union
 * 支持 node.js
 * 增加了一个完美序列化 serialize
 * 增加了简易events
 * parseString方法删除了decodeURIComponent 格式化字符
 * bind兼容方法的BUG修改
 * 增加了字符串驼峰话方法
 * 增加已时间为Key的唯一ID
 * Eventdestroy的时候的问题[me.state={}]
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function (WIN) {
	var _this = this;

	// 变量
	function limit(val) {
		if (!(this instanceof limit)) {
			return new limit(val);
		};
		this.__value__ = [val];
	};

	// commonJS 规范
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = limit;
		}
		exports.limit = limit;
	} else {
		WIN.limit = limit;
	};

	var objectProto = Object.prototype;
	var arrayProto = Array.prototype;
	var stringProto = String.prototype;
	var functionProto = Function.prototype;

	// 确定全局是否用兼容方法
	limit.limitFixed = false;
	limit.logClosed = false;

	// 自有属性
	var defineProperty = Object.defineProperty;
	var is = Object.is;
	var assign = Object.assign;
	var keys = Object.keys;
	var values = Object.values;
	var entries = Object.entries;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var toString = objectProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var valueOf = objectProto.valueOf;
	var from = Array.from;
	var of = Array.of;
	var concat = arrayProto.concat;
	var push = arrayProto.push;
	var slice = arrayProto.slice;
	var unshift = arrayProto.unshift;
	var splice = arrayProto.splice;
	var join = arrayProto.join;
	var pop = arrayProto.pop;
	var reverse = arrayProto.reverse;
	var shift = arrayProto.shift;
	var sort = arrayProto.sort;
	var forEach = arrayProto.forEach;
	var map = arrayProto.map;
	var filter = arrayProto.filter;
	var some = arrayProto.some;
	var every = arrayProto.every;
	var indexOf = arrayProto.indexOf;
	var lastIndexOf = arrayProto.lastIndexOf;
	var reduce = arrayProto.reduce;
	var reduceRight = arrayProto.reduceRight;
	var find = arrayProto.find;
	var findIndex = arrayProto.findIndex;
	var fill = arrayProto.fill;
	var copyWithin = arrayProto.copyWithin;
	var fromCodePoint = String.fromCodePoint;
	var trim = stringProto.trim;
	var codePointAt = stringProto.codePointAt;
	var startsWith = stringProto.startsWith;
	var endsWith = stringProto.endsWith;
	var repeat = stringProto.repeat;
	var padStart = stringProto.padStart;
	var padEnd = stringProto.padEnd;
	var bind = functionProto.bind;
	var parse = JSON.parse;
	var stringify = JSON.stringify;

	// 传递器

	var K = function K(val) {
		return val;
	};
	var F = function F() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return args;
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
		// 对name进行处理
		var arr = name.split(',');
		name = arr.shift();
		if (config.value === void 0) {
			// 新方法
			priority = getProp(config, 'priority', F);
			// 兼容性方法
			fixed = getProp(config, 'fixed', K);
			// 条件 [默认为false]
			when = getProp(config, 'when', E);
			// 格式化参数
			format = getProp(config, 'format', F);
			// 主函数
			value = function value() {
				var args = concat.call(arrayProto, format.apply(undefined, arguments));
				return !limit.limitFixed && when.apply(undefined, _toConsumableArray(args)) ? priority.apply(undefined, _toConsumableArray(args)) : fixed.apply(undefined, _toConsumableArray(args));
			};
		} else {
			value = config.value;
		};
		if (typeof value === 'function') {
			value.toString = function () {
				return 'function () { [native code] }';
			};
		};
		defineProperty(limit, name, {
			value: value,
			writable: false, //只读
			enumerable: true, //被枚举
			configurable: false //更改内部属性
		});
		if (!arr.length) {
			return value;
		};
		return defineIt(arr.join(','), config);
	};

	// 

	// 传递器
	defineIt('E', { value: E });
	defineIt('K', { value: K });
	defineIt('F', { value: F });

	// 版本
	defineIt('V', { value: '2.2.2' });

	// 获取属性
	defineIt('getProp', { value: getProp });

	// --错误日志-- //
	// 日志颜色
	var logColor = {
		'log': 'background:#333;',
		'error': 'background:#F00;',
		'info': 'background:#4d90fe;',
		'warn': 'background:#F70;'
	};

	// 错误提醒
	var typeWarn = {
		toString: function toString(obj, objStr) {
			return limit.message('warn', obj, 'change into', objStr);
		},
		toNumber: function toNumber(obj) {
			return limit.message('warn', obj, 'change into', 'NaN');
		},
		toArray: function toArray(obj) {
			return limit.message('warn', obj, 'change into []');
		},
		finiteNum: function finiteNum(obj) {
			return limit.message('warn', obj, 'is not a finite Number');
		},
		formatDate: function formatDate(obj) {
			return limit.message('warn', 'timestamp:', timestamp, 'date:', date, 'limit.formatDate is called');
		},
		bind: function bind(obj) {
			return limit.message('warn', fun, 'type is not function, limit.bind is called');
		}
	};

	// log
	defineIt('message', {
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
			if (!limit.contains(['error', 'log', 'warn', 'info'], type)) {
				args.unshift(type);
				type = 'error';
			};
			log = con[type] || K;
			// IE10下的IE8调试模式，console.log是个对象 纯IE8下 log = K;
			try {
				isChrome && args.unshift(logColor[type] + 'color:#FFF;padding-left:3px;border-radius:3px;');
				args.unshift((isChrome ? '%c' : '') + type.slice(0, 3) + ':');
				log.apply(con, args);
			} catch (e) {
				log('日志 ', args);
			};
		}
	});

	// 快捷方法
	defineIt('err', {
		value: function value() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			cacheLog(['err[' + limit.formatDate() + ']'].concat(args)), limit.message.apply(limit, ['error'].concat(args));
		}
	});
	defineIt('war', {
		value: function value() {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			cacheLog(['war[' + limit.formatDate() + ']'].concat(args)), limit.message.apply(limit, ['warn'].concat(args));
		}
	});
	defineIt('inf', {
		value: function value() {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			cacheLog(['inf[' + limit.formatDate() + ']'].concat(args)), limit.message.apply(limit, ['info'].concat(args));
		}
	});
	defineIt('log', {
		value: function value() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			limit.message.apply(limit, ['log'].concat(args));
		}
	});
	// 把警告和错误，缓存到本地
	var cacheRegExp = /limitLog(\d+\.\d+)/;
	var winLocalStorage = WIN.localStorage;
	// 清理缓存
	var cacheClear = function cacheClear() {
		if (winLocalStorage) {
			(function () {
				var time = limit.formatDate(new Date().getTime(), 'yyyyMMdd.HH');
				// 清楚1天之前的信息
				limit.forin(winLocalStorage, function (val, key) {
					if (cacheRegExp.test(key) && limit['?'](time + ' - ' + RegExp.$1) > 1) {
						localStorage.removeItem(key);
					};
				});
			})();
		};
	};
	// 设置缓存
	var cacheLog = function cacheLog(args) {
		if (winLocalStorage) {
			// 获取当前的时间
			var time = limit.formatDate(new Date().getTime(), 'yyyyMMdd.HH');
			var cacheId = 'limitLog' + time;
			var oldLog = winLocalStorage.getItem(cacheId) || '';
			// 缓存信息
			winLocalStorage.setItem(cacheId, '' + oldLog + args + '\n');
		};
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
			return !limit.isUndefined(n);
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

	defineIt('isObjectSuper', { value: function value(n) {
			return toString.call(n) === '[object Object]' && '' + n === '[object Object]';
		} });

	// 是否是参数
	defineIt('isArguments', { value: function value(n) {
			return limit.has(n, 'callee');
		} });

	// array arguments nodeList jObject window[排除] function[排除]
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

	// 是否为空 '' [] {} null undefined
	defineIt('isEmpty', {
		value: function value(n) {
			if (n == null) {
				return true;
			} else if (limit.isFunction(n)) {
				return false;
			} else if (limit.isArrayLike(n) || limit.isObject(limit.valueOf(n))) {
				return limit.size(n) === 0;
			} else {
				return false;
			};
		}
	});

	// --检查参数-- //

	// 如果是null undefined 返回空对象
	var checkTargetNoEqualNull = function checkTargetNoEqualNull(target) {
		for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
			args[_key7 - 1] = arguments[_key7];
		}

		return target == null ? [{}].concat(args) : [target].concat(args);
	};

	// 如果是控制为array
	var checkTargetWithArray = function checkTargetWithArray(target) {
		for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
			args[_key8 - 1] = arguments[_key8];
		}

		return [limit.toArray(target)].concat(args);
	};

	// 控制参数为字符串
	var checkTargetWithString = function checkTargetWithString(target) {
		for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
			args[_key9 - 1] = arguments[_key9];
		}

		return [limit.toString(target)].concat(args);
	};

	// 控制参数为数字
	var checkTargetWithNumber = function checkTargetWithNumber(target) {
		for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
			args[_key10 - 1] = arguments[_key10];
		}

		return [limit.toNumber(target)].concat(args);
	};

	// 确定第一个参数是对象，第二个参数函数
	var checkObjFunction = function checkObjFunction(obj, iterator) {
		for (var _len11 = arguments.length, args = Array(_len11 > 2 ? _len11 - 2 : 0), _key11 = 2; _key11 < _len11; _key11++) {
			args[_key11 - 2] = arguments[_key11];
		}

		return checkTargetNoEqualNull.apply(undefined, [obj, limit.cb(iterator)].concat(args));
	};

	// 确定第一个参数是数组，第二个参数函数
	var checkArrFunction = function checkArrFunction(arr, iterator) {
		for (var _len12 = arguments.length, args = Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
			args[_key12 - 2] = arguments[_key12];
		}

		return checkTargetWithArray.apply(undefined, [arr, limit.cb(iterator)].concat(args));
	};

	// 确定正确的遍历值 
	var checkTrueIndex = function checkTrueIndex(length, index) {
		// 默认值是0
		index = limit.parseInt(index);
		length = limit.parseInt(length);
		if (index < 0) {
			index = length + index;
			if (index < 0) {
				index = 0;
			};
		};
		return index;
	};

	// 确定是正整数
	var checkPositive = function checkPositive(num) {
		num = limit.parseInt(num);
		return num < 0 ? 0 : num;
	};

	// 确实字符和正整数
	var checkStringNumber = function checkStringNumber(str, num) {
		return [limit.toString(str), checkPositive(num)];
	};

	// 确认padArgs
	var checkPadArgs = function checkPadArgs(str, leg, arg) {
		arg = limit.toString(arg);
		return [limit.toString(str), checkPositive(leg), arg ? arg : ' '];
	};

	// 确定有限数
	var checkFiniteNum = function checkFiniteNum() {
		for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
			args[_key13] = arguments[_key13];
		}

		return limit.every(limit.flatten(args), function (val) {
			var flag = limit.isFinite(val);
			if (!flag) {
				typeWarn.finiteNum(val);
			};
			return flag;
		});
	};

	// 参数降位
	var checkFlattenArgs = function checkFlattenArgs() {
		for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
			args[_key14] = arguments[_key14];
		}

		return limit.flatten(args);
	};

	// --工具方法-- //

	// 获取uid
	var UID = [0, 0, 0];
	defineIt('getUid', {
		value: function value() {
			var index = UID.length;
			var code = void 0;
			while (index--) {
				code = UID[index];
				if (code === 9) {
					UID[index] = 0;
				};
				if (code < 9) {
					UID[index]++;
					return UID.join('.');
				};
			};
			UID.unshift(1);
			return UID.join('.');
		}
	});

	var uidCatchTime = null;
	var uidCatchId = null;
	defineIt('getTimeUid', {
		value: function value() {
			var time = new Date().getTime();
			if (time !== uidCatchTime) {
				uidCatchTime = time;
				uidCatchId = 0;
			};
			return [uidCatchTime, limit.padStart(++uidCatchId, 3, '0')].join('');
		}
	});

	// 私有遍历
	defineIt('_loop', {
		value: function value(obj, iterator, context, isBreak, begin) {
			// 循环遍历
			var target = limit._getLoopKey(obj),
			    key = void 0,
			    num = limit.parseInt(begin),
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
		format: checkObjFunction,
		fixed: function fixed(obj, iterator, context) {
			for (var key in obj) {
				iterator.call(context, obj[key], key, obj);
			};
		}
	});

	// 循环
	defineIt('each', {
		format: checkObjFunction,
		when: function when(obj) {
			return isArrayLike(obj) && forEach;
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

	// --对象-- //
	// ES6: Object.is();
	defineIt('is', {
		when: function when() {
			return !!is;
		},
		priority: function priority() {
			return is.apply(undefined, arguments);
		},
		fixed: function fixed(a, b) {
			// 区分NaN
			if (limit.isNaN(a) && limit.isNaN(b)) {
				return true;
			};
			// 区分 +0 -0
			if (a === 0 && b === 0) {
				return 1 / a === 1 / b;
			};
			return a === b;
		}
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
		fixed: function fixed(target) {
			for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
				args[_key15 - 1] = arguments[_key15];
			}

			limit.each(args, function (val) {
				limit.each(val, function (val, key) {
					target[key] = val;
				});
			});
			return target;
		}
	});

	// ES6: Object.values();
	defineIt('values', {
		when: function when() {
			return !!values;
		},
		priority: function priority() {
			return values.apply(undefined, arguments);
		},
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			var result = [];
			limit.each(target, function (val) {
				result.push(val);
			});
			return result;
		}
	});

	// ES6: Object.entries();
	defineIt('entries', {
		when: function when() {
			return !!entries;
		},
		priority: function priority() {
			return entries.apply(undefined, arguments);
		},
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			var result = [];
			limit.each(target, function (val, key) {
				result.push([key, val]);
			});
			return result;
		}
	});

	// ES5: Object.keys();
	var keysFixed = function keysFixed(obj) {
		var arr = [];
		limit.forin(obj, function (val, key) {
			return limit.has(obj, key) && arr.push(key);
		});
		return arr;
	};

	defineIt('keys', {
		when: function when() {
			return !!keys;
		},
		priority: function priority() {
			try {
				return keys.apply(undefined, arguments);
			} catch (e) {
				return keysFixed.apply(undefined, arguments);
			}
		},
		format: checkTargetNoEqualNull,
		fixed: keysFixed
	});

	// mix: keysSuper
	defineIt('keysSuper', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			if (getOwnPropertyNames) {
				return getOwnPropertyNames(obj);
			} else {
				return keysFixed(obj);
			};
		}
	});

	// mix: assignSuper
	defineIt('assignSuper', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
				args[_key16 - 1] = arguments[_key16];
			}

			limit.each(args, function (val) {
				limit.each(val, function (val, key) {
					limit.isDefined(val) && (target[key] = val);
				});
			});
			return target;
		}
	});

	// mix: assignSuper
	defineIt('assignLazy', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
				args[_key17 - 1] = arguments[_key17];
			}

			limit.each(args, function (val) {
				limit.each(val, function (val, key) {
					limit.isDefined(val) && limit.isUndefined(target[key]) && (target[key] = val);
				});
			});
			return target;
		}
	});

	// mix: extend
	defineIt('extend', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
				args[_key18 - 1] = arguments[_key18];
			}

			limit.each(args, function (val) {
				limit.forin(val, function (val, key) {
					target[key] = val;
				});
			});
			return target;
		}
	});

	// mix: extendSuper
	defineIt('extendSuper', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			for (var _len19 = arguments.length, args = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
				args[_key19 - 1] = arguments[_key19];
			}

			limit.each(args, function (val) {
				limit.forin(val, function (val, key) {
					limit.isDefined(val) && (target[key] = val);
				});
			});
			return target;
		}
	});

	// mix: extendLazy
	defineIt('extendLazy', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(target) {
			for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
				args[_key20 - 1] = arguments[_key20];
			}

			limit.each(args, function (val) {
				limit.forin(val, function (val, key) {
					limit.isDefined(val) && limit.isUndefined(target[key]) && (target[key] = val);
				});
			});
			return target;
		}
	});

	// mix: getValueInObject
	defineIt('getValueInObject', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
				args[_key21 - 1] = arguments[_key21];
			}

			limit.some(args, function (val) {
				try {
					obj = obj[val];
				} catch (e) {
					return obj = undefined, true;
				};
			});
			return obj;
		}
	});

	// mix: size
	defineIt('size', {
		value: function value(n) {
			return limit._getLoopKey(n).length;
		}
	});

	// mix: stack
	defineIt('stack', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			for (var _len22 = arguments.length, args = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
				args[_key22 - 1] = arguments[_key22];
			}

			limit.each(args, function (val1) {
				limit.each(obj, function (val2, key) {
					var val = val1[key];
					limit.isDefined(val) && (obj[key] = val);
				});
			});
			return obj;
		}
	});

	// --数组-- //

	// mix: toArray
	var sliceFix = function sliceFix(obj) {
		var arr = [],
		    i = 0;
		for (; i < obj.length; i++) {
			arr[i] = obj[i];
		};
		return arr;
	};
	defineIt('toArray', {
		value: function value(obj) {
			var rtv = [];
			// 如果是数组原始返回
			if (limit.isArray(obj)) {
				return push.apply(rtv, obj), rtv;
			} else if (limit.isArrayLike(obj)) {
				// 如果是类数组对象的话就格式化数组
				var arr = void 0;
				try {
					arr = slice.call(obj);
				} catch (e) {
					arr = sliceFix(obj);
				};
				return push.apply(rtv, arr), rtv;
			} else {
				return typeWarn.toArray(obj), rtv;
			};
		}
	});

	// mix: contains [支持obj]
	defineIt('contains', {
		value: function value(arr, target) {
			return limit.some(arr, function (val) {
				return limit.is(val, target);
			});
		}
	});

	// mix: flatten
	defineIt('flatten', {
		value: function value() {
			var value = [];

			for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
				args[_key23] = arguments[_key23];
			}

			limit.forEach(args, function (val) {
				// concate 可以少几次循环
				push.apply(value, limit.isArray(val) ? limit.flatten.apply(undefined, concat.apply(arrayProto, val)) : [val]);
			});
			return value;
		}
	});

	// mix: union
	defineIt('union', {
		format: checkTargetWithArray,
		fixed: function fixed(arr) {
			var target = new Map();
			return limit.filter(arr, function (val) {
				if (!target.has(val)) {
					target.set(val, true);
					return true;
				};
			});
		}
	});

	// mix: whiteList
	var whiteBlack = function whiteBlack(factor, val1) {
		return limit.some(factor, function (val2) {
			return limit.every(val2, function (val3, key3) {
				return limit.is(val3, val1[key3]);
			});
		});
	};
	// 白名单
	defineIt('whiteList', {
		format: checkTargetWithArray,
		fixed: function fixed(arr) {
			for (var _len24 = arguments.length, args = Array(_len24 > 1 ? _len24 - 1 : 0), _key24 = 1; _key24 < _len24; _key24++) {
				args[_key24 - 1] = arguments[_key24];
			}

			args = limit.flatten(args);
			return limit.filter(arr, function (val1) {
				return whiteBlack(args, val1);
			});
		}
	});
	// 黑名单
	defineIt('blackList', {
		format: checkTargetWithArray,
		fixed: function fixed(arr) {
			for (var _len25 = arguments.length, args = Array(_len25 > 1 ? _len25 - 1 : 0), _key25 = 1; _key25 < _len25; _key25++) {
				args[_key25 - 1] = arguments[_key25];
			}

			args = limit.flatten(args);
			return limit.filter(arr, function (val1) {
				return !whiteBlack(args, val1);
			});
		}
	});

	// mix: difference [支持obj]
	defineIt('difference', {
		value: function value(arr) {
			for (var _len26 = arguments.length, args = Array(_len26 > 1 ? _len26 - 1 : 0), _key26 = 1; _key26 < _len26; _key26++) {
				args[_key26 - 1] = arguments[_key26];
			}

			args = limit.flatten(args);
			return limit.filter(arr, function (val) {
				return !limit.contains(args, val);
			});
		}
	});

	// mix: remove 
	defineIt('remove', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(arr, tar, formIndex) {
			var index = limit.indexOfSuper(arr, tar, formIndex);
			if (index !== -1) {
				try {
					if (limit.isArray(arr)) {
						arr.splice(index, 1);
					} else {
						delete arr[index];
					};
					return true;
				} catch (e1) {
					try {
						arr[index] = undefined;
						return true;
					} catch (e2) {
						limit['err'](e1, e2);
					};
				};
			};
			return false;
		}
	});

	// mix: removeAll
	defineIt('removeAll', {
		value: function value(arr, tar) {
			if (limit.remove(arr, tar)) {
				return limit.removeAll(arr, tar);
			} else {
				return arr;
			};
		}
	});

	// mix: first [支持obj]
	defineIt('first', {
		format: checkTargetNoEqualNull,
		when: function when(arr) {
			return limit.isArrayLike(arr);
		},
		priority: function priority(arr) {
			return arr[0];
		},
		fixed: function fixed(obj) {
			var keys = limit.keys(obj);
			return obj[keys[0]];
		}
	});

	// mix: last [支持obj]
	defineIt('last', {
		format: checkTargetNoEqualNull,
		when: function when(arr) {
			return limit.isArrayLike(arr);
		},
		priority: function priority(arr) {
			return arr[arr.length - 1];
		},
		fixed: function fixed(obj) {
			var keys = limit.keys(obj);
			return obj[keys[keys.length - 1]];
		}
	});

	// ES4: push [不改变原数组]
	defineIt('push', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			Function.call.apply(push, arguments);
			return arguments[0];
		}
	});

	// ES4: pop [不改变原数组]
	defineIt('pop', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			Function.call.apply(pop, arguments);
			return arguments[0];
		}
	});

	// ES4: unshift [不改变原数组]
	defineIt('unshift', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			Function.call.apply(unshift, arguments);
			return arguments[0];
		}
	});

	// ES4: shift [不改变原数组]
	defineIt('shift', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			Function.call.apply(shift, arguments);
			return arguments[0];
		}
	});

	// ES4: reverse [不改变原数组]
	defineIt('reverse', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			return Function.call.apply(reverse, arguments);
		}
	});

	// ES4: sort [不改变原数组]
	defineIt('sort', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			return Function.call.apply(sort, arguments);
		}
	});

	// ES4: splice [不改变原数组]
	defineIt('splice', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			Function.call.apply(splice, arguments);
			return arguments[0];
		}
	});

	// ES4: join [不改变原数组]
	defineIt('join', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			return Function.call.apply(join, arguments);
		}
	});

	// ES4: concat [不改变原数组]
	defineIt('concat', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			return Function.call.apply(concat, arguments);
		}
	});

	// ES4: slice [不改变原数组]
	defineIt('slice', {
		format: checkTargetWithArray,
		fixed: function fixed() {
			return Function.call.apply(slice, arguments);
		}
	});

	// ES5: forEach [支持obj]
	defineIt('forEach', {
		format: checkObjFunction,
		when: function when(arr) {
			return forEach && arr.forEach === forEach;
		},
		priority: function priority() {
			return Function.call.apply(forEach, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			return limit.isArrayLike(arr) ? limit.each(arr, function (val, key) {
				iterator.call(context, val, +key, arr);
			}, context) : limit.each(arr, iterator, context);
		}
	});

	// ES5: map [支持obj]
	defineIt('map', {
		format: checkObjFunction,
		when: function when(arr) {
			return map && arr.map === map;
		},
		priority: function priority() {
			return Function.call.apply(map, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			// 初始化数组
			var result = limit.isArrayLike(arr) ? [] : {};
			// 遍历
			limit.each(arr, function (val, key) {
				result[key] = iterator.call(this, val, key, arr);
			}, context);
			return result;
		}
	});

	// ES5: filter [支持obj]
	defineIt('filter', {
		format: checkObjFunction,
		when: function when(arr) {
			return filter && arr.filter === filter;
		},
		priority: function priority() {
			return Function.call.apply(filter, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			// 初始化数组
			var isArr = limit.isArrayLike(arr),
			    result = isArr ? [] : {};
			isArr ? limit.each(arr, function (val, key) {
				iterator.call(this, val, key, arr) && result.push(val);
			}, context) : limit.each(arr, function (val, key) {
				iterator.call(this, val, key, arr) && (result[key] = val);
			});
			return result;
		}
	});

	// ES5: some [支持obj]
	defineIt('some', {
		format: checkObjFunction,
		when: function when(arr) {
			return some && arr.some === some;
		},
		priority: function priority() {
			return Function.call.apply(some, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			// 初始化
			var result = false;
			limit.isArrayLike(arr) ? limit._loop(arr, function (val, key) {
				if (iterator.call(context, val, +key, arr)) return result = true, false;
			}, undefined, true) : limit._loop(arr, function (val, key) {
				if (iterator.call(context, val, key, arr)) return result = true, false;
			}, undefined, true);
			return result;
		}
	});

	// ES5: every [支持obj]
	defineIt('every', {
		format: checkObjFunction,
		when: function when(arr) {
			return every && arr.every === every;
		},
		priority: function priority() {
			return Function.call.apply(every, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			// 初始化
			var result = true;
			limit.isArrayLike(arr) ? limit._loop(arr, function (val, key) {
				if (!iterator.call(context, val, +key, arr)) return result = false;
			}, undefined, true) : limit._loop(arr, function (val, key) {
				if (!iterator.call(context, val, key, arr)) return result = false;
			}, undefined, true);
			return result;
		}
	});

	// ES5: indexOf [支持obj]
	defineIt('indexOf', {
		format: checkTargetNoEqualNull,
		when: function when(arr) {
			return indexOf && arr.indexOf === indexOf;
		},
		priority: function priority() {
			return Function.call.apply(indexOf, arguments);
		},

		fixed: function fixed(arr, ele, formIndex) {
			// 初始化返回值
			var index = -1;
			limit._loop(arr, function (val, key) {
				if (val === ele) return index = key, false;
			}, undefined, true, checkTrueIndex(arr.length, formIndex));
			// loop为了兼容返回值是string
			return limit.isArrayLike(arr) ? +index : index;
		}
	});

	// ES5: indexOfSuper [支持obj]
	defineIt('indexOfSuper', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(arr, ele, formIndex) {
			// 初始化返回值
			var index = -1;
			limit._loop(arr, function (val, key) {
				if (limit.is(val, ele)) return index = key, false;
			}, undefined, true, checkTrueIndex(arr.length, formIndex));
			// loop为了兼容返回值是string
			return limit.isArrayLike(arr) ? +index : index;
		}
	});

	// ES5: lastIndexOf
	defineIt('lastIndexOf', {
		format: checkTargetWithArray,
		when: function when(arr) {
			return lastIndexOf && arr.lastIndexOf === lastIndexOf;
		},
		priority: function priority() {
			return Function.call.apply(lastIndexOf, arguments);
		},
		fixed: function fixed(arr, ele, formIndex) {
			formIndex = limit.parseInt(formIndex);
			var len = arr.length - 1,
			    index = limit.indexOf(arr.reverse(), ele, arguments.length === 3 ? len - formIndex : formIndex);
			// 因为是倒叙
			return index === -1 ? -1 : len - index;
		}
	});

	// ES5: reduce
	var ERR_MSG_REDUCE = new TypeError('Reduce of empty array with no initial value');
	defineIt('reduce', {
		format: checkArrFunction,
		when: function when(arr) {
			return reduce && arr.reduce === reduce;
		},
		priority: function priority() {
			return Function.call.apply(reduce, arguments);
		},
		fixed: function fixed(arr, iterator, init) {
			// 初始化
			var len = arguments.length,
			    index = 0,
			    noInit = len === 2,
			    result = noInit ? arr[index++] : init;
			// 如果只有两个参数且数组为空的话就报错
			if (noInit && arr.length === 0) throw ERR_MSG_REDUCE;
			// 遍历
			limit._loop(arr, function (val, key) {
				result = iterator.call(this, result, val, +key, arr);
			}, undefined, false, index);
			return result;
		}
	});

	// ES5: reduceRight
	defineIt('reduceRight', {
		format: checkArrFunction,
		when: function when(arr) {
			return reduceRight && arr.reduceRight === reduceRight;
		},
		priority: function priority() {
			return Function.call.apply(reduceRight, arguments);
		},
		fixed: function fixed() {
			for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
				args[_key27] = arguments[_key27];
			}

			var len = args[0].length - 1,
			    iterator = args[1];
			args[0].reverse();
			args[1] = function (before, val, key, arr) {
				return iterator(before, val, len - key, arr);
			};
			return limit.reduce.apply(limit, args);
		}
	});

	// ES6: from
	defineIt('from', {
		format: checkObjFunction,
		when: function when() {
			return !!from;
		},
		priority: function priority() {
			return from.apply(undefined, arguments);
		},
		fixed: function fixed(obj, iterator, context) {
			var arr = [];
			// 确保是函数
			if (obj && obj.length) {
				// 不考虑IE8的话可以这样写 push.apply(arr, obj);
				push.apply(arr, slice.call(obj));
				return limit.map(arr, iterator, context);
			} else {
				return arr;
			};
		}
	});

	// ES6: of
	defineIt('of', {
		when: function when() {
			return !!of;
		},
		priority: function priority() {
			return of.apply(undefined, arguments);
		},
		fixed: function fixed() {
			for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
				args[_key28] = arguments[_key28];
			}

			return slice.call(args);
		}
	});

	// ES6: find [支持obj]
	defineIt('find', {
		format: checkObjFunction,
		when: function when(arr) {
			return find && arr.find === find;
		},
		priority: function priority() {
			return Function.call.apply(find, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			var target = void 0;
			limit.some(arr, function (val, key, arr) {
				if (iterator(val, key, arr)) {
					return target = val, true;
				};
			});
			return target;
		}
	});

	// ES6: findIndex [支持obj]
	defineIt('findIndex', {
		format: checkObjFunction,
		when: function when(arr) {
			return findIndex && arr.findIndex === findIndex;
		},
		priority: function priority() {
			return Function.call.apply(findIndex, arguments);
		},

		fixed: function fixed(arr, iterator, context) {
			var target = -1;
			limit.some(arr, function (val, key, arr) {
				if (iterator(val, key, arr)) {
					return target = key, true;
				};
			});
			return target;
		}
	});

	// ES6: fill
	defineIt('fill', {
		format: checkTargetWithArray,
		when: function when(arr) {
			return fill && arr.fill === fill;
		},
		priority: function priority() {
			return Function.call.apply(fill, arguments);
		},

		fixed: function fixed(arr, target, start, end) {
			var arrLen = arr.length;
			// 格式化起点终点
			start = limit.parseInt(start);
			end = limit.parseInt(end);
			// 纠正小于零的情况
			start = start < 0 ? arrLen + start : start;
			end = end <= 0 ? arrLen + end : end;
			// 纠正特殊情况
			start < 0 && (start = 0);
			end > arrLen && (end = arrLen);
			var len = end - start;
			// 长度必须大于0
			if (len > 0) {
				var arg = limit.from(new Array(len), function () {
					return target;
				});
				unshift.call(arg, start, len);
				splice.apply(arr, arg);
			};
			return arr;
		}
	});

	// ES6: includes
	defineIt('includes', {
		when: function when(arr) {
			return !!arr.includes;
		},
		priority: function priority(arr, target, index) {
			return arr.includes(target, index);
		},
		fixed: function fixed(arr, target, index) {
			if (limit.isString(arr)) {
				return arr.indexOf(target, index) !== -1;
			} else {
				if (!limit.isNaN(target)) {
					return limit.indexOf(arr, target, index) !== -1;
				} else {
					var result = false;
					limit._loop(arr, function (val, key) {
						if (limit.isNaN(val)) return result = true, false;
					}, undefined, true, checkTrueIndex(arr.length, index));
					return result;
				};
			};
		}
	});

	// ES6: copyWithin
	defineIt('copyWithin', {
		format: checkTargetWithArray,
		when: function when(arr) {
			return copyWithin && arr.copyWithin === copyWithin;
		},
		priority: function priority() {
			return Function.call.apply(copyWithin, arguments);
		},

		fixed: function fixed(arr, target, start, end) {
			var args = arr.slice(start, end);
			args.unshift(target, args.length);
			splice.apply(arr, args);
			return arr;
		}
	});

	// --函数-- //
	// Promise

	var MyPromise = function () {
		function MyPromise() {
			var _this2 = this;

			_classCallCheck(this, MyPromise);

			// 状态值
			this.PromiseStatus = 'pedding';
			// 返回值
			this.PromiseValue = undefined;
			// 栈区
			this.Stack = [];
			if (limit.isFunction(arguments.length <= 0 ? undefined : arguments[0])) {
				this.promiseList = [];
				var _fun = arguments.length <= 0 ? undefined : arguments[0];
				var resolve = function resolve(val) {
					limit.each([_this2].concat(_this2.promiseList), function (promise) {
						if (promise.PromiseStatus === 'pedding') {
							promise.PromiseStatus = 'resolved';
							promise.PromiseValue = val;
							promise.cleanStack();
						};
					});
				};
				var reject = function reject(val) {
					limit.each([_this2].concat(_this2.promiseList), function (promise) {
						if (promise.PromiseStatus === 'pedding') {
							promise.PromiseStatus = 'rejected';
							promise.PromiseValue = val;
							promise.cleanStack();
						};
					});
					setTimeout(function () {
						if (!_this2.promiseList.length) {
							throw '(in promise) ' + val;
						};
					}, 0);
				};
				try {
					_fun(resolve, reject);
				} catch (e) {
					this.PromiseStatus = 'rejected';
					this.PromiseValue = e;
				};
			} else {
				this.PromiseStatus = arguments.length <= 0 ? undefined : arguments[0];
				this.PromiseValue = arguments.length <= 1 ? undefined : arguments[1];
			};
		}

		_createClass(MyPromise, [{
			key: 'then',
			value: function then(suc, err) {
				var me = this;
				if (me.promiseList) {
					var originMe = me;
					me = new MyPromise(me.PromiseStatus, me.PromiseValue);
					originMe.promiseList.push(me);
				};
				me.Stack.push({ suc: suc, err: err });
				if (me.PromiseStatus !== 'pedding' && !me.cleanStatus) {
					me.cleanStack();
				};
				return me;
			}
		}, {
			key: 'errorBack',
			value: function errorBack() {
				var me = this;
				// 如果没有
				if (!me.Stack.length) {
					return setTimeout(function () {
						throw '(in promise) ' + me.PromiseValue;
					}, 0);
				} else {
					return me.cleanStack();
				};
			}
		}, {
			key: 'successBack',
			value: function successBack() {
				var me = this,
				    PromiseValue = me.PromiseValue;
				// 如果返回是个promise对象
				if (PromiseValue && PromiseValue.then) {
					PromiseValue.then(function (val) {
						me.PromiseValue = val;
						me.PromiseStatus = 'resolved';
					}, function (val) {
						me.PromiseValue = val;
						me.PromiseStatus = 'rejected';
					}).then(function () {
						me.cleanStack();
					});
				} else {
					return me.cleanStack();
				};
			}
		}, {
			key: 'cleanStack',
			value: function cleanStack() {
				var me = this,
				    one = me.Stack.shift();
				me.cleanStatus = 'init';
				if (one) {
					setTimeout(function () {
						try {
							switch (me.PromiseStatus) {
								case 'resolved':
									if (one.suc) {
										me.PromiseValue = one.suc.call(undefined, me.PromiseValue);
									} else {
										return me.cleanStack();
									};
									break;
								case 'rejected':
									if (one.err) {
										me.PromiseValue = one.err.call(undefined, me.PromiseValue);
									} else {
										return me.errorBack();
									};
									break;
							};
							me.PromiseStatus = 'resolved';
						} catch (e) {
							me.PromiseStatus = 'rejected';
							me.PromiseValue = e;
							return me.errorBack();
						};
						return me.successBack();
					}, 0);
				} else {
					delete me.cleanStatus;
				};
			}
		}], [{
			key: 'all',
			value: function all(list) {
				var guid = list.length,
				    back = void 0,
				    args = [];
				function main(arg, key) {
					args[key] = arg;
					if (! --guid) {
						back(args);
					};
				};
				return new MyPromise(function (resolve, reject) {
					back = resolve;
					limit.each(list, function (val, key) {
						// Promise对象
						if (val.PromiseStatus) {
							val.then(function (sucVal) {
								main(sucVal, key);
							}, function (errVal) {
								reject(errVal);
							});
						} else {
							main(val, key);
						};
					});
				});
			}
		}, {
			key: 'race',
			value: function race(list) {
				return new MyPromise(function (resolve, reject) {
					limit.each(list, function (val) {
						MyPromise.resolve(val).then(function (sucVal) {
							return resolve(sucVal);
						}, function (errVal) {
							return reject(errVal);
						});
					});
				});
			}
		}, {
			key: 'resolve',
			value: function resolve(val) {
				if (val && val.then) {
					return new MyPromise(function (resolve, reject) {
						val.then(resolve, reject);
					});
				};
				return new MyPromise(function (resolve, reject) {
					resolve(val);
				});
			}
		}, {
			key: 'reject',
			value: function reject(val) {
				return new MyPromise(function (resolve, reject) {
					reject(val);
				});
			}
		}]);

		return MyPromise;
	}();

	;

	MyPromise.prototype['catch'] = function (fn) {
		return this.then(null, fn);
	};

	MyPromise.prototype['finally'] = function (fn) {
		return this.then(K, K).then(fn);
	};

	var winPromise = WIN.Promise;

	defineIt('promise', {
		when: function when() {
			return !!winPromise;
		},
		priority: function priority() {
			return winPromise;
		},
		fixed: function fixed() {
			return MyPromise;
		}
	});

	if (winPromise) {
		winPromise.prototype['finally'] = MyPromise.prototype['finally'];
	} else {
		WIN.Promise = MyPromise;
	};

	// Map

	var MyMap = function () {
		function MyMap(arrIn) {
			_classCallCheck(this, MyMap);

			var me = this;
			var arr = me.arr = [];
			limit.forEach(arrIn, function (val) {
				if (!limit.isArray(val)) {
					throw new TypeError('Iterator value ' + val + ' is not an entry object');
				};
				arr.push({ key: val[0], val: val[1] });
			});
		}

		_createClass(MyMap, [{
			key: 'clear',
			value: function clear() {
				var me = this;
				me.arr.length = 0;
			}
		}, {
			key: 'forEach',
			value: function forEach(fn, context) {
				var me = this;
				limit.forEach(me.arr, function (val) {
					fn.call(context, val.val, val.key);
				});
			}
		}, {
			key: '_get',
			value: function _get(key) {
				var me = this;
				var target = [];
				limit.some(me.arr, function (val, i) {
					if (limit.is(val.key, key)) {
						target.push(val, i);
						return true;
					};
				});
				return target;
			}
		}, {
			key: 'has',
			value: function has(key) {
				var me = this;
				return limit.some(me.arr, function (val) {
					return limit.is(val.key, key);
				});
			}
		}, {
			key: 'get',
			value: function get(key) {
				var me = this;
				var target = void 0;
				limit.some(me.arr, function (val) {
					if (limit.is(val.key, key)) {
						target = val.val;
						return true;
					};
				});
				return target;
			}
		}, {
			key: 'set',
			value: function set(key, val) {
				var me = this;
				var arr = me.arr;
				var target = me._get(key);
				if (target.length) {
					target[0].val = val;
				} else {
					arr.push({ key: key, val: val });
				};
				return me;
			}
		}, {
			key: 'keys',
			value: function keys() {
				var me = this;
				var result = [];
				me.forEach(function (val, key) {
					result.push(key);
				});
				return result;
			}
		}, {
			key: 'values',
			value: function values() {
				var me = this;
				var result = [];
				me.forEach(function (val, key) {
					result.push(val);
				});
				return result;
			}
		}, {
			key: 'size',
			value: function size() {
				var me = this;
				return me.arr.length;
			}
		}]);

		return MyMap;
	}();

	MyMap.prototype['delete'] = function (key) {
		var me = this;
		var arr = me.arr;
		var target = me._get(key);
		if (target.length) {
			arr.splice(target[1], 1);
			return true;
		} else {
			return false;
		};
	};

	var winMap = WIN.Map;

	defineIt('Map', {
		when: function when() {
			return !!winMap;
		},
		priority: function priority() {
			return winMap;
		},
		fixed: function fixed() {
			return MyMap;
		}
	});

	if (!winMap) {
		WIN.Map = MyMap;
	}

	// 创建原型
	function C() {};
	function classCreatePro(PRO) {
		var create = Object.create;
		//新的API
		if (create) {
			return create(PRO);
		} else if (PRO.__proto__) {
			return {
				__proto__: PRO
			};
		} else {
			C.prototype = PRO;
			return new C();
		}
	};

	// 继承
	function classExtend(SUB, PAR) {
		//继承
		SUB.prototype = classCreatePro(PAR.prototype);
		//构造器
		return SUB;
	}

	// mix: bind 对bind做了统一兼容处理
	defineIt('bind', {
		format: function format(fn) {
			for (var _len29 = arguments.length, args = Array(_len29 > 1 ? _len29 - 1 : 0), _key29 = 1; _key29 < _len29; _key29++) {
				args[_key29 - 1] = arguments[_key29];
			}

			return [limit.cb(fn)].concat(args);
		},
		when: function when(fn) {
			return bind && fn.bind === bind;
		},
		priority: function priority() {
			for (var _len30 = arguments.length, args1 = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
				args1[_key30] = arguments[_key30];
			}

			return Function.call.apply(bind, [].concat(args1));
		},
		fixed: function fixed(fn) {
			for (var _len31 = arguments.length, args1 = Array(_len31 > 1 ? _len31 - 1 : 0), _key31 = 1; _key31 < _len31; _key31++) {
				args1[_key31 - 1] = arguments[_key31];
			}

			// 兼容的方法
			function main() {
				var me = this;
				if (!(me instanceof main)) {
					me = args1[0];
				}
				args1.shift();

				for (var _len32 = arguments.length, args2 = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
					args2[_key32] = arguments[_key32];
				}

				return Function.call.apply(fn, [me].concat(args1, args2));
			};
			classExtend(main, fn);
			// 咋骗，可以让兼容方法伪装的更像
			main.toString = function () {
				return 'function () { [native code] }';
			};
			return main;
		}
	});

	// mix: compose 组合 a(b(c())) => (a(), b(), c());
	defineIt('compose', {
		value: function value() {
			for (var _len33 = arguments.length, args1 = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
				args1[_key33] = arguments[_key33];
			}

			return function () {
				for (var _len34 = arguments.length, args2 = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
					args2[_key34] = arguments[_key34];
				}

				var result = args2;
				for (var i = args1.length - 1; i >= 0; i--) {
					result = [].concat(args1[i].apply(this, result));
				};
				return result.length <= 1 ? result[0] : result;
			};
		}
	});

	// 事件

	var Events = function () {
		function Events() {
			_classCallCheck(this, Events);

			this.state = {
				maxListeners: 10,
				listeners: {}
			};
		}

		_createClass(Events, [{
			key: 'warnListenerCount',
			value: function warnListenerCount(eventName) {
				var me = this;
				var state = me.state;

				var listeners = state.listeners;
				var count = listeners[eventName].length;
				if (count > state.maxListeners) {
					limit.war('Possible EventEmitter memory leak detected. ' + count + ' ' + eventName + ' listeners added. Use emitter.setMaxListeners() to increase limit');
				};
			}
		}, {
			key: 'on',
			value: function on(eventName, listener) {
				var me = this;
				var state = me.state;

				if (!state || !state.listeners) return me;
				var listeners = state.listeners;
				if (listeners[eventName]) {
					listeners[eventName].push(limit.cb(listener));
					me.warnListenerCount(eventName);
				} else {
					listeners[eventName] = [limit.cb(listener)];
				};
				return me;
			}
		}, {
			key: 'once',
			value: function once(eventName, listener) {
				var me = this;
				var state = me.state;

				if (!state || !state.listeners) return me;
				var listeners = state.listeners;
				var newListener = function newListener() {
					var _limit$cb;

					(_limit$cb = limit.cb(listener)).call.apply(_limit$cb, [me].concat(Array.prototype.slice.call(arguments)));
					me.removeListener(eventName, newListener);
					me.warnListenerCount(eventName);
				};
				if (listeners[eventName]) {
					listeners[eventName].push(newListener);
				} else {
					listeners[eventName] = [newListener];
				};
				return me;
			}
		}, {
			key: 'emit',
			value: function emit(eventName) {
				for (var _len35 = arguments.length, args = Array(_len35 > 1 ? _len35 - 1 : 0), _key35 = 1; _key35 < _len35; _key35++) {
					args[_key35 - 1] = arguments[_key35];
				}

				var me = this;
				var state = me.state;

				if (!state || !state.listeners) return me;
				var listeners = state.listeners;
				if (listeners[eventName]) {
					limit.each(listeners[eventName], function (val) {
						val.call.apply(val, [me].concat(args));
					});
				};
				return me;
			}
		}, {
			key: 'removeListener',
			value: function removeListener(eventName, listener) {
				var me = this;
				var state = me.state;

				if (!state || !state.listeners) return me;
				var listeners = state.listeners;
				if (listeners[eventName]) {
					limit.remove(listeners[eventName], listener);
				};
				return me;
			}
		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners(eventName) {
				var me = this;
				var state = me.state;

				if (!state || !state.listeners) return me;
				var listeners = state.listeners;
				if (listeners[eventName]) {
					delete listeners[eventName];
				} else {
					state.listeners = {};
				};
				return me;
			}
		}, {
			key: 'getMaxListeners',
			value: function getMaxListeners() {
				var me = this;
				var state = me.state;

				if (!state) return;
				return state.maxListeners;
			}
		}, {
			key: 'setMaxListeners',
			value: function setMaxListeners(n) {
				var me = this;
				var state = me.state;

				if (!state) return me;
				state.maxListeners = limit.parseInt(n);
				return me;
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				var me = this;
				delete me.state;
				delete me.props;
				return me;
			}
		}]);

		return Events;
	}();

	;

	defineIt('Events', {
		value: Events
	});

	// --字符-- //

	// mix: toString
	defineIt('toString', {
		value: function value(obj) {
			// 如果没有入参就返回本身
			if (!arguments.length) {
				return 'function limit() { [native code] }';
			};
			// 如果是null或者undefined
			if (obj == null) {
				return '';
			};
			// 如果是-0的话toString会不正确
			if (limit.is(obj, -0)) {
				return '-0';
			};
			// 如果是对象的话，就出log
			var objStr = '' + obj;
			if (objStr === '[object Object]') {
				try {
					objStr = JSON.stringify(obj);
					typeWarn.toString(obj, objStr);
				} catch (e) {
					limit['war'](e);
				};
			};
			return objStr;
		}
	});

	// mix: parseHumpString 格式化驼峰字符
	defineIt('parseHumpString', {
		format: checkTargetWithString,
		fixed: function fixed(key) {
			for (var _len36 = arguments.length, args = Array(_len36 > 1 ? _len36 - 1 : 0), _key36 = 1; _key36 < _len36; _key36++) {
				args[_key36 - 1] = arguments[_key36];
			}

			args = args.map(function (val) {
				val = limit.toString(val);
				if (val.length > 1) {
					return '' + val.slice(0, 1).toLocaleUpperCase() + val.slice(1).toLocaleLowerCase();
				} else {
					return val;
				};
			});
			return [key].concat(_toConsumableArray(args)).join('');
		}
	});

	// mix: valueOf
	defineIt('valueOf', {
		value: function value(obj) {
			// 如果没有入参就返回本身
			if (!arguments.length) {
				return limit;
			};
			if (obj == null) {
				return obj;
			};
			try {
				return obj.valueOf();
			} catch (e) {
				return obj;
			};
		}
	});

	// 字符串的剪切
	defineIt('wordWrap', {
		format: checkTargetWithString,
		fixed: function fixed(str) {
			var length = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var key = arguments.length <= 2 || arguments[2] === undefined ? '...' : arguments[2];

			var totle = str.length;
			length = checkPositive(length);
			if (length > 0 && length < totle) {
				return '' + str.slice(0, length) + key;
			};
			return str;
		}
	});

	// 字符串解析成对象
	defineIt('parseString', {
		format: checkTargetWithString,
		fixed: function fixed(str) {
			var val1 = arguments.length <= 1 || arguments[1] === undefined ? '&' : arguments[1];
			var val2 = arguments.length <= 2 || arguments[2] === undefined ? '=' : arguments[2];

			var obj = {};
			var arr = str.split(val1);
			// 空判断
			if (str === '') {
				return obj;
			};
			limit.each(arr, function (val) {
				var temp = val.split(val2),
				    k = temp[0],
				    v = temp[1];
				try {
					v = parse(v);
				} catch (e) {};
				// 如果不存在就当对象
				if (limit.isUndefined(obj[k])) {
					obj[k] = v;
				}
				// 如果存在就变成数组
				else {
						if (limit.isArray(obj[k])) {
							obj[k].push(v);
						} else {
							var cv = obj[k];
							var co = obj[k] = [];
							co.push(cv, v);
						};
					};
			});
			return obj;
		}
	});

	// 对象解析成字符串
	defineIt('unParseString', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			var val1 = arguments.length <= 1 || arguments[1] === undefined ? '&' : arguments[1];
			var val2 = arguments.length <= 2 || arguments[2] === undefined ? '=' : arguments[2];

			var list = [];
			limit.isObjectSuper(obj) && limit.each(obj, function (val, key) {
				val = limit.valueOf(val);
				if (limit.isObject(val)) {
					try {
						var str = JSON.stringify(val);
						str && list.push('' + key + val2 + str);
					} catch (e) {
						list.push('' + key + val2 + val);
					};
				} else {
					list.push('' + key + val2 + val);
				};
			});
			return list.join(val1);
		}
	});

	// 解析对象 {'a':'a1', 'a.a': 'a2', 'a[0]a': 'a3'}
	var REX_OBJ = /^(\w+)\.(.+)/;
	var REX_ARR = /^(\w+)\[(\d+)\](.+)/;
	defineIt('serialize', {
		format: checkTargetNoEqualNull,
		fixed: function fixed(obj) {
			limit.each(obj, function (val, key) {
				// 对象规范
				if (REX_OBJ.test(key)) {
					var tempKey = RegExp.$1; //b
					var tempVal = RegExp.$2; //a
					var tempObj = obj[tempKey];
					if (!tempObj) {
						tempObj = obj[tempKey] = {};
					};
					tempObj[tempVal] = val;
					delete obj[key];
					return limit.serialize(tempObj);
				} else if (REX_ARR.test(key)) {
					//数组规范
					var _tempKey = RegExp.$1; //b
					var tempPos = RegExp.$2; //0
					var _tempVal = RegExp.$3; //a
					var tempArr = obj[_tempKey];
					if (!tempArr) {
						tempArr = obj[_tempKey] = [];
					};
					var _tempObj = tempArr[tempPos];
					if (!_tempObj) {
						_tempObj = tempArr[tempPos] = {};
					};
					_tempObj[_tempVal] = val;
					delete obj[key];
					return limit.serialize(_tempObj);
				} else {
					JSON[key] = val;
				};
			});
			return obj;
		}
	});

	// ES5: trim
	var REG_EXP_TRIM = /^\s+|\s+$/g;
	defineIt('trim', {
		format: checkTargetWithString,
		when: function when(str) {
			return trim && str.trim === trim;
		},
		priority: function priority() {
			return Function.call.apply(trim, arguments);
		},

		fixed: function fixed(str) {
			return str.replace(REG_EXP_TRIM, '');
		}
	});

	// ES6: codePointAt
	// 反编译
	var fixCodePointAt = function fixCodePointAt(codeH, codeL) {
		codeH = limit.padStart((codeH & 1023).toString(2), 10, '0');
		codeL = limit.padStart((codeL & 1023).toString(2), 10, '0');
		return parseInt(codeH + codeL, 2) + 0x10000;
	};
	defineIt('codePointAt', {
		format: checkStringNumber,
		when: function when(str) {
			return codePointAt && str.codePointAt === codePointAt;
		},
		priority: function priority() {
			return Function.call.apply(codePointAt, arguments);
		},
		fixed: function fixed(str, index) {
			var code = str.charCodeAt(index);
			if (code >= 0xD800 && code <= 0xDBFF) {
				return fixCodePointAt(code, str.charCodeAt(++index));
			} else {
				return code;
			};
		}
	});

	// ES6: fromCodePoint
	// 编译
	var parseUnicode = function parseUnicode(str16) {
		// 防御如果在 0xFFFF 内的不转义
		if (parseInt(str16, 16) <= 0xFFFF) return [str16];
		// 1.原始长度减去0x10000
		var origin = parseInt(str16, 16) - 0x10000;
		// 获取高位和低位
		var originH = origin >> 10,
		    originL = origin & 1023;
		// 获取转义后的高低位
		originH = (0xD800 | originH).toString(16).toUpperCase();
		originL = (0xDC00 | originL).toString(16).toUpperCase();
		return [originH, originL];
	};
	defineIt('fromCodePoint', {
		format: checkTargetWithNumber,
		when: function when() {
			return !!fromCodePoint;
		},
		priority: function priority(code) {
			return fromCodePoint(code);
		},
		fixed: function fixed(code) {
			if (limit.isNaN(code)) {
				throw new RangeError('Invalid code point NaN');
			};
			if (code < 0 || code > 0x10FFFF) {
				throw new RangeError('Invalid code point ' + code);
			};
			code = limit.map(parseUnicode(code.toString(16)), function (val) {
				return '\\u' + limit.padStart(val, 4, '0');
			}).join('');
			return new Function('return "' + code + '"')();
		}
	});

	// ES6: repeat
	defineIt('repeat', {
		format: checkStringNumber,
		when: function when(str) {
			return repeat && str.repeat === repeat;
		},
		priority: function priority() {
			return Function.call.apply(repeat, arguments);
		},

		fixed: function fixed(str, num) {
			return limit.from(new Array(num), function () {
				return str;
			}).join('');
		}
	});

	// ES6: padStart 浏览器还未实现
	defineIt('padStart', {
		format: checkPadArgs,
		when: function when(str) {
			return false && padStart && str.padStart === padStart;
		},
		priority: function priority() {
			return Function.call.apply(padStart, arguments);
		},
		fixed: function fixed(str, leg, arg) {
			var max = str.length,
			    min = void 0;
			// 如果要的长度比原字符小就原始返回
			if (max >= leg) {
				return str;
			};
			min = Math.ceil((leg - max) / arg.length);
			return (limit.repeat(arg, min) + str).slice(-leg);
		}
	});

	// ES6: padEnd 浏览器还未实现
	defineIt('padEnd', {
		format: checkPadArgs,
		when: function when(str) {
			return false && padEnd && str.padEnd === padEnd;
		},
		priority: function priority() {
			return Function.call.apply(padEnd, arguments);
		},
		fixed: function fixed(str, leg, arg) {
			var max = str.length,
			    min = void 0;
			// 如果要的长度比原字符小就原始返回
			if (max >= leg) {
				return str;
			};
			min = Math.ceil((leg - max) / arg.length);
			return (str + limit.repeat(arg, min)).slice(0, leg);
		}
	});

	// ES6: startsWith
	defineIt('startsWith', {
		format: checkTargetWithString,
		when: function when(str) {
			return startsWith && str.startsWith === startsWith;
		},
		priority: function priority() {
			return Function.call.apply(startsWith, arguments);
		},
		fixed: function fixed(str, arg, index) {
			index = limit.parseInt(index);
			var result = str.indexOf(arg, index);
			return result !== -1 && result === index;
		}
	});

	// ES6: endsWith
	defineIt('endsWith', {
		format: checkTargetWithString,
		when: function when(str) {
			return endsWith && str.endsWith === endsWith;
		},
		priority: function priority() {
			return Function.call.apply(endsWith, arguments);
		},
		fixed: function fixed(str, arg, index) {
			index = arguments.length === 3 ? limit.parseInt(index) : str.length;
			if (index > str.length) {
				index = str.length;
			};
			var leg = index - arg.length,
			    result = str.lastIndexOf(arg, leg);
			return result !== -1 && str.lastIndexOf(arg, leg) === leg;
		}
	});

	// --数字-- //

	// mix: toNumber
	defineIt('toNumber', {
		value: function value(obj) {
			// 如果是null或者undefined
			if (obj == null) {
				return 0;
			};
			// 如果是数字
			if (limit.isNumber(obj)) {
				return obj;
			};
			// 如果日期或者布尔
			if (limit.isDate(obj) || limit.isBoolean(obj)) {
				return +obj;
			};
			// 如果是字符串
			if (limit.isString(obj)) {
				if (limit.isNumber(+obj)) {
					return +obj;
				};
			};
			typeWarn.toNumber(obj);
			return NaN;
		}
	});

	// mix: parseInt
	defineIt('parseInt', {
		format: checkTargetWithNumber,
		fixed: function fixed(obj) {
			// 格式化NaN为0;
			if (!obj) {
				obj = 0;
			};
			return parseInt(obj, 10);
		}
	});

	// mix: random
	defineIt('random', {
		value: function value(form, to) {
			// 格式化入参
			form = limit.parseInt(form);to = limit.parseInt(to);
			var max = Math.max(form, to),
			    min = Math.min(form, to);
			return Math.floor((max - min + 1) * Math.random() + min);
		}
	});

	// mix: thousandSeparator 
	var REG_THOUSAND_SEPARATOR = /(\d{1,3})(?=(\d{3})+$)/g;
	var REG_THOUSAND_SEPARATOR_COMMA = /,/g;
	defineIt('thousandSeparator', {
		format: checkTargetWithNumber,
		fixed: function fixed(num) {
			var med = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

			med = checkPositive(med);
			// 控制入参
			if (!checkFiniteNum(num)) {
				return '';
			};
			num = limit.toFixed(num, med);
			num = num.split('.');
			num[0] = num[0].replace(REG_THOUSAND_SEPARATOR, '$1,');
			return num.join('.');
		}
	});

	defineIt('unThousandSeparator', {
		value: function value(str) {
			return limit.toNumber(str.replace(REG_THOUSAND_SEPARATOR_COMMA, ''));
		}
	});

	// 小数点右移
	var movePointRight = function movePointRight(sign, leftStr, rightStr, scale) {
		//如果 刻度比右边的字符长度小
		if (scale < rightStr.length) {
			return sign + leftStr + rightStr.slice(0, scale) + '.' + rightStr.slice(scale);
		} else {
			return sign + leftStr + limit.padEnd(rightStr, scale, '0');
		};
	};

	// 小数点左移
	var movePointLeft = function movePointLeft(sign, leftStr, rightStr, scale) {
		if (leftStr.length > scale) {
			return sign + leftStr.slice(0, -scale) + '.' + leftStr.slice(-scale) + rightStr;
		} else {
			return sign + '0.' + limit.padStart(leftStr, scale, '0') + rightStr;
		};
	};

	// 小数点偏移
	var movePoint = function movePoint(num, scale) {
		num = limit.toNumber(num);
		// 控制入参
		if (!checkFiniteNum(num)) {
			return num;
		};
		// 格式化num为字符串
		num = limit.toString(num);
		// 控制入参scale为整数
		scale = limit.parseInt(scale);
		// 对于0的快速处理
		if (scale === 0) {
			return num;
		};
		var leftStr = void 0,
		    rightStr = void 0,
		    sign = '';
		// 切割字符串
		num = num.split('.');
		leftStr = num[0];
		rightStr = num[1] || '';
		//如果是负数对leftStr的处理
		if (leftStr.charAt(0) === '-') {
			sign = '-';
			leftStr = leftStr.slice(1);
		};
		return scale < 0 ? movePointLeft(sign, leftStr, rightStr, -scale) : movePointRight(sign, leftStr, rightStr, scale);
	};

	// mix: toFixed
	defineIt('toFixed', {
		value: function value(num, scale) {
			// scale为正整数
			scale = checkPositive(scale);
			return movePoint(Math.round(movePoint(num, scale)), -scale);
		}
	});

	// 获取最大的小数位
	var getMaxScale = function getMaxScale() {
		for (var _len37 = arguments.length, args = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
			args[_key37] = arguments[_key37];
		}

		if (!checkFiniteNum(args)) {
			return null;
		};
		return Math.max.apply(Math, limit.map(args, function (val) {
			return (('' + val).split('.')[1] || '').length;
		}));
	};

	// mix: plus
	defineIt('plus,+', {
		format: checkFlattenArgs,
		fixed: function fixed() {
			for (var _len38 = arguments.length, args = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
				args[_key38] = arguments[_key38];
			}

			var maxScale = getMaxScale.apply(undefined, args);
			if (limit.isNull(maxScale)) {
				return NaN;
			};
			return limit.reduce(args, function (before, val) {
				return +movePoint(+movePoint(before, maxScale) + +movePoint(val, maxScale), -maxScale);
			});
		}
	});

	// mix: minus
	defineIt('minus,-', {
		format: checkFlattenArgs,
		fixed: function fixed() {
			for (var _len39 = arguments.length, args = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
				args[_key39] = arguments[_key39];
			}

			var maxScale = getMaxScale.apply(undefined, args);
			if (limit.isNull(maxScale)) {
				return NaN;
			};
			return limit.reduce(args, function (before, val) {
				return +movePoint(+movePoint(before, maxScale) - +movePoint(val, maxScale), -maxScale);
			});
		}
	});

	// 获取所需要的值
	var getNeedNum = function getNeedNum(args, falg) {
		var tar = limit.toString(args[0]),
		    arg = limit.toString(args[1]),
		    medTar = (tar.split('.')[1] || '').length,
		    medArg = (arg.split('.')[1] || '').length;
		var num = falg ? +movePoint(+tar.replace('.', '') * +arg.replace('.', ''), -(medTar + medArg)) : +movePoint(+tar.replace('.', '') / +arg.replace('.', ''), medArg - medTar);
		args.splice(0, 2, num);
		return num;
	};

	// mix: multiply
	defineIt('multiply,*', {
		format: checkFlattenArgs,
		fixed: function fixed() {
			for (var _len40 = arguments.length, args = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
				args[_key40] = arguments[_key40];
			}

			if (!checkFiniteNum(args)) {
				return NaN;
			};
			//格式化数字为字符串
			var num = getNeedNum(args, true);
			return args.length <= 1 ? num : limit['*'](args);
		}
	});

	// mix: multiply
	defineIt('except,/', {
		format: checkFlattenArgs,
		fixed: function fixed() {
			for (var _len41 = arguments.length, args = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
				args[_key41] = arguments[_key41];
			}

			if (!checkFiniteNum(args)) {
				return NaN;
			};
			//格式化数字为字符串
			var num = getNeedNum(args, false);
			return args.length <= 1 ? num : limit['/'](args);
		}
	});

	// mix: 
	// const BRACKETS_REG = /\(((?!.*\().*?)\)/;
	var BRACKETS_REG = /\(([^()]*)\)/;
	var MULTANDDIVISION_REG = /(-?\d+(?:\.\d+)?)(?:\s*)([\*\/])(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)/;
	var EXPRESS_REG = /^(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)([\+\-])(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)/;
	defineIt('express,?', {
		value: function value(exp) {
			// 优先计算*/
			if (MULTANDDIVISION_REG.test(exp)) {
				return limit.express(exp.replace(MULTANDDIVISION_REG, function (a, b, c, d) {
					return limit[c](+b, +d);
				}));
			};
			// 如果存在()
			if (BRACKETS_REG.test(exp)) {
				return limit.express(exp.replace(BRACKETS_REG, function (a, b, c, d) {
					return limit.express(b);
				}));
			};
			if (!EXPRESS_REG.test(exp)) {
				return limit.toNumber(exp);
			};
			return limit.express(exp.replace(EXPRESS_REG, function (a, b, c, d) {
				return limit[c](+b, +d);
			}));
		}
	});

	// --日期-- //
	var REG_EXP_DATA = /^(yyyy)?(?:(.*)(MM))?(?:(.*)(dd))?(?:(.*)(HH))?(?:(.*)(mm))?(?:(.*)(ss))?(.*)?$/;
	var FUN_DATAS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds'];
	defineIt('formatDate', {
		value: function value() {
			var timestamp = arguments.length <= 0 || arguments[0] === undefined ? new Date().getTime() : arguments[0];
			var formatStr = arguments.length <= 1 || arguments[1] === undefined ? 'yyyy-MM-dd HH:mm:ss' : arguments[1];

			timestamp = new Date(timestamp);
			formatStr = limit.toString(formatStr);
			if (limit.isNaN(+timestamp) || !REG_EXP_DATA.test(formatStr)) {
				return '';
			};
			// 正常入参
			return formatStr.replace(REG_EXP_DATA, function () {
				for (var _len42 = arguments.length, args = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
					args[_key42] = arguments[_key42];
				}

				var arr = [];
				limit.each(slice.call(args, 1, -2), function (val, key) {
					var value = void 0;
					if (val) {
						if (key % 2 === 0) {
							value = timestamp[FUN_DATAS[key / 2]]();
							// 如果是月份进一
							val === 'MM' && value++;
							// 如果是非年补零
							val !== 'yyyy' && (value = limit.padStart(value, 2, '0'));
							arr.push(value);
						} else {
							arr.push(val);
						};
					};
				});
				return arr.join('');
			});
		}
	});

	// 重构limit函数
	limit.each(limit, function (val, key) {
		if (limit.isFunction(val)) {
			limit.prototype[key] = function () {
				for (var _len43 = arguments.length, args = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
					args[_key43] = arguments[_key43];
				}

				this.__value__.push(limit[key].apply(limit, [limit.last(this.__value__)].concat(args)));
				return this;
			};
		} else {
			limit.prototype[key] = val;
		};
	});
	limit.assign(limit.prototype, {
		end: function end() {
			this.__value__.pop();
			return this;
		},
		val: function val() {
			return limit.last(this.__value__);
		},
		toLog: function toLog() {
			limit.log(this.val());
			return this;
		}
	});

	// 对IE下 JSON.stringify 的修复
	;(function (JSON) {
		var rex = /(\\u\w{4})/g;
		JSON.stringify = function (json, replacer, space) {
			if (json == null) {
				json = '';
			};
			var str = stringify(json, replacer, space);
			if (str) {
				return str.replace(rex, function (a) {
					return new Function('return "' + a + '"')();
				});
			} else {
				return '';
			};
		};
	})(JSON);

	cacheClear();
})(typeof window === 'undefined' ? global : window);