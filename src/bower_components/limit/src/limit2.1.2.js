"use strict";
/**
 * 2016.08.24
 * version: 2.1.0
 */

"use strict";
;(function(WIN){
	// 变量
	function limit(val){
		if( !(this instanceof limit) ){
			return new limit(val);
		};
		this.__value__ = [val];
	};

	// commonJS 规范
	if( typeof exports !== 'undefined' ){
		if( typeof module !== 'undefined' && module.exports ) {
			exports = module.exports = limit;
		}
		exports.limit = limit;
	}else{
		WIN.limit = limit;
	};

	const objectProto = Object.prototype;
	const arrayProto = Array.prototype;
	const stringProto = String.prototype;
	const functionProto = Function.prototype;

	// 确定全局是否用兼容方法
	limit.limitFixed = false;
	limit.logClosed = false;

	// 自有属性
	const { defineProperty, is, assign, keys, values, entries, getOwnPropertyNames } = Object;
	const { toString, hasOwnProperty } = objectProto;
	const { from, of } = Array;
	const {	concat, push, slice, unshift, splice, join, pop, reverse, shift, sort,
			forEach, map, filter, some, every, indexOf, lastIndexOf, reduce, reduceRight,
			find, findIndex, fill, copyWithin } = arrayProto;
	const { fromCodePoint } = String;
	const { trim, codePointAt, startsWith, endsWith, repeat, padStart, padEnd } = stringProto;
	const { bind } = functionProto;
	const { parse, stringify } = JSON;

	// 传递器
	const K = val => val;
	const F = (...args) => args;

	// 空函数
	const E = () => {};

	// 空对象
	const O = {};

	// 获取属性
	const getProp = (obj = O, key = '', deVal) => obj[key] === void 0 ? deVal : obj[key];

	// 定义:priority,fixed,when,format
	const defineIt = (name, config = O) => {
		let priority, fixed, when, format, value;
		// 对name进行处理
		let arr = name.split(',');
		name = arr.shift();
		if( config.value === void 0 ){
			// 新方法
			priority = getProp(config, 'priority', F);
			// 兼容性方法
			fixed = getProp(config, 'fixed', K);
			// 条件 [默认为false]
			when = getProp(config, 'when', E);
			// 格式化参数
			format = getProp(config, 'format', F);
			// 主函数
			value = function(){
				let args = concat.call( arrayProto, format(...arguments) );
				return !limit.limitFixed && when(...args) ? priority(...args) : fixed(...args);
			};
		}else{
			value = config.value;
		};
		if( typeof value === 'function' ){
			value.toString = () => 'function () { [native code] }';
		};
		defineProperty(limit, name, {
			value,
			writable: false, //只读
			enumerable: true, //被枚举
			configurable: false //更改内部属性
		});
		if(!arr.length){
			return value;
		};
		return defineIt(arr.join(','), config);
	};

	// 传递器
	defineIt('K', {value: K});
	defineIt('F', {value: F});

	// 版本
	defineIt('V', {value: '2.1.0'});

	// 获取属性
	defineIt('getProp', {value: getProp});

	// --错误日志-- //
		// 日志颜色
		const logColor = {
			'log': 'background:#333;margin-left:11px;padding-right:17px;',
			'error': 'background:#F00;padding-right:3px;',
			'warn': 'background:#F70;margin-left:11px;padding-right:10px;'
		};

		// 错误提醒
		const typeWarn = {
			toString: (obj, objStr) => limit.log('warn', obj, 'change into', objStr),
			toNumber: obj => limit.log('warn', obj, 'change into', 'NaN'),
			toArray: obj => limit.log('warn', obj, 'change into []'),
			finiteNum: obj => limit.log('warn', obj, 'is not a finite Number'),
			formatDate: obj => limit.log('warn', 'timestamp:', timestamp, 'date:', date, 'limit.formatDate is called'),
			bind: obj => limit.log('warn', fun, 'type is not function, limit.bind is called')
		};

		// log
		defineIt('log', {
			value(...args){
				if(limit.logClosed) return;
				let type = args.shift(),
					con = console || O,
					log,
					isChrome = WIN.chrome;
				// 对type的处理可选值 'error'[默认]|'log'|'warn'
				// 这里可以优化用
				if( !limit.contains(['error', 'log', 'warn'], type) ){
					args.unshift(type);
					type = 'error';
				};
				log = con[type] || K;
				// IE10下的IE8调试模式，console.log是个对象 纯IE8下 log = K;
				try{
					isChrome && args.unshift(logColor[type]+'color:#FFF;padding-left:3px;border-radius:3px;');
					args.unshift( (isChrome ? '%c' : '') + type + ':');
					log.apply(con, args);
				}catch(e){
					log('日志 ', args);
				};
			}
		});

		// 快捷方法
		defineIt('T.T', {
			value: (...args) => limit.log(...['error', ...args])
		});
		defineIt('!!!', {
			value: (...args) => limit.log(...['warn', ...args])
		});
		defineIt('...', {
			value: (...args) => limit.log(...['log', ...args])
		});

	// --判定方法-- //

		// 是否是DOM元素
		defineIt('isElement', { value: n => !!n && n.nodeType === 1 });

		// 判断是否是docuemtn
		defineIt('isDocument', { value: n => !!n && n.nodeType === 9 });

		// 判断是否是window
		defineIt('isWin', { value: n => !!n && n.window === n && n.self == n });

		// 是否是未定义undefined
		defineIt('isUndefined', { value: n => n === void 0 });

		// 是否是定义
		defineIt('isDefined', { value: n => !limit.isUndefined(n) });

		// 是否是空null
		defineIt('isNull', { value: n => n === null });

		// 是否是函数function
		defineIt('isFunction', { value: n => typeof n === 'function' });

		// 是否是布尔boolean
		defineIt('isBoolean', { value: n => n === true || n === false || toString.call(n) === '[object Boolean]' });

		// 是否是这些[string number array data regexp error]对象
		'String,Number,Array,Date,RegExp,Error,Math'.replace(/\w+/g, (k) => defineIt('is' + k, { value: n => toString.call(n) === '[object '+k+']' }) );

		// 是否是对象 除了5种基本类型以外都是对象
		defineIt('isObject', { value: n => limit.isFunction(n) || typeof n === 'object' && !!n });

		// 是否是参数
		defineIt('isArguments', { value: n => limit.has(n, 'callee') });

		// array arguments nodeList jObject window[排除] function[排除]
		defineIt('isArrayLike', { value: n => !!n && limit.isNumber(n.length) && !limit.isFunction(n) && !limit.isWin(n) });

		// 是否是NaN
		defineIt('isNaN', { 
			when: () => !!Number.isNaN, 
			priority: (...args) => Number.isNaN(...args), 
			fixed: n => limit.isNumber(n) && isNaN(n) 
		});

		// 是否是有限的
		defineIt('isFinite', { 
			when: () => !!Number.isFinite, 
			priority: (...args) => Number.isFinite(...args), 
			fixed: n => limit.isNumber(n) && isFinite(n) 
		});

		// 是否为整数
		defineIt('isInteger', { 
			when: () => !!Number.isInteger, 
			priority: (...args) => Number.isInteger(...args), 
			fixed: n => limit.isFinite(n) && Math.floor(n) === n 
		});

		// 是否为安全整数
		defineIt('isSafeInteger', { 
			when: () => !!Number.isSafeInteger, 
			priority: (...args) => Number.isSafeInteger(...args), 
			fixed: n => limit.isInteger(n) && -9007199254740992 < n && n < 9007199254740992 
		});

		// 是否为空
		defineIt('isEmpty', {
			value: n => n == null || limit.size(n) === 0
		});

	// --检查参数-- //

		// 如果是null undefined 返回空对象
		const checkTargetNoEqualNull = (target, ...args) => target == null ? [{}, ...args] : [target, ...args];

		// 如果是控制为array
		const checkTargetWithArray = (target, ...args) => [limit.toArray(target), ...args];

		// 控制参数为字符串
		const checkTargetWithString = (target, ...args) => [limit.toString(target), ...args];

		// 控制参数为数字
		const checkTargetWithNumber = (target, ...args) => [limit.toNumber(target), ...args];

		// 确定第一个参数是对象，第二个参数函数
		const checkObjFunction = (obj, iterator, ...args) => checkTargetNoEqualNull(obj, limit.cb(iterator), ...args);

		// 确定第一个参数是数组，第二个参数函数
		const checkArrFunction = (arr, iterator, ...args) => checkTargetWithArray(arr, limit.cb(iterator), ...args);

		// 确定正确的遍历值 
		const checkTrueIndex = (length, index) => {
			// 默认值是0
			index = ~~index;
			length = ~~length;
			if( index < 0 ){
				index = length + index;
				if( index < 0 ){
					index = 0;
				};
			};
			return index;
		};

		// 确定是正整数
		const checkPositive = (num) => {
			num = ~~num;
			return num < 0 ? 0 : num;
		};

		// 确实字符和正整数
		const checkStringNumber = (str, num) => [limit.toString(str), checkPositive(num)];

		// 确认padArgs
		const checkPadArgs = (str, leg, arg) => {
			arg = limit.toString(arg);
			return [limit.toString(str), checkPositive(leg), arg ? arg : ' '];
		};

		// 确定有限数
		const checkFiniteNum = (...args) => {
			return limit.every( limit.flatten(args), (val) => {
				let flag = limit.isFinite(val);
				if(!flag){
					typeWarn.finiteNum(val);
				};
				return flag;
			});
		};

		// 参数降位
		const checkFlattenArgs = (...args) => limit.flatten(args);

	// --工具方法-- //

		// 获取uid
		const UID = [0, 0, 0];
		defineIt('getUid', {
			value(){
				let index = UID.length,
					code;
				while(index--){
					code = UID[index];
					if(code === 9){
						UID[index] = 0;
					};
					if(code < 9){
						UID[index]++;
						return UID.join('.');
					};
				};
				UID.unshift(1);
				return UID.join('.');
			}
		});

		// 私有遍历
		defineIt('_loop', {
			value: (obj, iterator, context, isBreak, begin) => {
				// 循环遍历
				let target = limit._getLoopKey(obj),
					key, num = ~~begin, len = target.length;
				for(; num < len; num++){
					key = target[num];
					if( iterator.call(context, obj[key], key, obj) === false && isBreak ) break;
				};
			}
		});

		// 获取键值
		defineIt('_getLoopKey', { value: obj => limit.isArrayLike(obj) ? limit.keys( limit.toArray(obj) ) : limit.keys(obj) });

		// 静态判定
		defineIt('has', {
			format: checkTargetNoEqualNull,
			fixed: (n, k) => hasOwnProperty.call(n, k)
		});

		// 确定是函数
		defineIt('cb', { value: callback => limit.isFunction(callback) ? callback : K });

		// 遍历
		defineIt('forin', {
			format: checkObjFunction,
			fixed(obj, iterator, context){
				for(let key in obj){
					iterator.call(context, obj[key], key, obj);
				};
			}
		});

		// 循环
		defineIt('each', {
			format: checkObjFunction,
			when: (obj) => isArrayLike(obj) && forEach,
			priority: (obj, iterator, context) => forEach.call(obj, (val, key) => { iterator.call(this, val, ''+key) }, context),
			value: (obj, iterator, context) => limit._loop(obj, iterator, context)
		});

	// --对象-- //
		// ES6: Object.is();
		defineIt('is', {
			when: () => !!is,
			priority: (...args) => is(...args),
			fixed(a, b){
				// 区分NaN
				if( limit.isNaN(a) && limit.isNaN(b)){
					return true;
				};
				// 区分 +0 -0
				if( a === 0 && b === 0){
					return 1/a === 1/b;
				};
				return a === b;
			}
		});

		// ES6: Object.assign();
		defineIt('assign', {
			when: () => !!assign,
			priority: (...args) => assign(...args),
			format: checkTargetNoEqualNull,
			fixed(target, ...args){
				limit.each(args, val => {
					limit.each(val, (val, key) => {
						target[key] = val;
					});
				});
				return target;
			}
		});

		// ES6: Object.values();
		defineIt('values', {
			when: () => !!values,
			priority: (...args) => values(...args),
			format: checkTargetNoEqualNull,
			fixed(target){
				let result = [];
				limit.each(target, val => {
					result.push(val);
				});
				return result;
			}
		});

		// ES6: Object.entries();
		defineIt('entries', {
			when: () => !!entries,
			priority: (...args) => entries(...args),
			format: checkTargetNoEqualNull,
			fixed(target){
				let result = [];
				limit.each(target, (val, key) => {
					result.push([key, val]);
				});
				return result;
			}
		});

		// ES5: Object.keys();
		const keysFixed = (obj) => {
			let arr = [];
			limit.forin(obj, (val, key) => limit.has(obj, key) && arr.push(key) );
			return arr;
		};
		
		defineIt('keys', {
			when: () => !!keys,
			priority: (...args) => {
				try{
					return keys(...args);
				}catch(e){
					return keysFixed(...args);
				}
			},
			format: checkTargetNoEqualNull,
			fixed: keysFixed
		});

		// mix: keysSuper
		defineIt('keysSuper', {
			value(obj){
				if(getOwnPropertyNames){
					return getOwnPropertyNames(obj);
				}else{
					return keysFixed(obj);
				};
			}
		});

		// mix: assignSuper
		defineIt('assignSuper', {
			format: checkTargetNoEqualNull,
			fixed(target, ...args){
				limit.each(args, val => {
					limit.each(val, (val, key) => {
						limit.isDefined(val) && (target[key] = val);
					});
				});
				return target;
			}
		});

		// mix: extend
		defineIt('extend', {
			format: checkTargetNoEqualNull,
			fixed(target, ...args){
				limit.each(args, val => {
					limit.forin(val, (val, key) => {
						target[key] = val;
					});
				});
				return target;
			}
		});

		// mix: extendSuper
		defineIt('extendSuper', {
			format: checkTargetNoEqualNull,
			fixed(target, ...args){
				limit.each(args, val => {
					limit.forin(val, (val, key) => {
						limit.isDefined(val) && (target[key] = val);
					});
				});
				return target;
			}
		});

		// mix: getValueInObject
		defineIt('getValueInObject', {
			format: checkTargetNoEqualNull,
			fixed(obj, ...args){
				limit.some(args, val => {
					try{
						obj = obj[val];
						return !limit.isObject(obj);
					}catch(e){
						return obj = undefined, true;
					};
				});
				return obj;
			}
		});

		// mix: size
		defineIt('size', {
			value: n => limit._getLoopKey(n).length
		});

		// mix: stack
		defineIt('stack', {
			format: checkTargetNoEqualNull,
			fixed(obj, ...args){
				limit.each(args, (val1) => {
					limit.each(obj, (val2, key) => {
						let val = val1[key];
						limit.isDefined(val) && (obj[key] = val);
					});
				});
				return obj;
			}
		});

	// --数组-- //

		// mix: toArray
		const sliceFix = obj => {
			let arr = [], 
				i = 0;
			for(; i < obj.length; i++){
				arr[i] = obj[i];
			};
			return arr;
		};
		defineIt('toArray', {
			value: obj => {
				let rtv = [];
				// 如果是数组原始返回
				if( limit.isArray(obj) ){
					return (push.apply(rtv, obj), rtv);
				}else if( limit.isArrayLike(obj) ){ // 如果是类数组对象的话就格式化数组
					let arr;
					try{
						arr = slice.call(obj);
					}catch(e){
						arr = sliceFix(obj);
					};
					return (push.apply(rtv, arr), rtv);
				}else{
					return (typeWarn.toArray(obj), rtv);
				};
			}
		});

		// mix: contains [支持obj]
		defineIt('contains', {
			value: (arr, target) => limit.some(arr, val => limit.is(val, target))
		});

		// mix: flatten
		defineIt('flatten', {
			value(...args){
				let value = [];
				limit.forEach(args, val => {
					// concate 可以少几次循环
					push.apply( value, limit.isArray(val) ? limit.flatten.apply( undefined, concat.apply(arrayProto, val) ) : [val] );
				});
				return value;
			}
		});

		// mix: union
		defineIt('union', {
			format: checkTargetWithArray,
			fixed(arr){
				let target = [];
				return limit.filter(arr, val => {
					return !limit.contains(target, val) && (target.push(val), true);
				});
			}
		});

		// mix: whiteList
		const whiteBlack = (factor, val1) => {
			return limit.some(factor, (val2) => {
				return limit.every(val2, (val3, key3) => {
					return limit.is(val3, val1[key3]);
				});
			});
		};
		// 白名单
		defineIt('whiteList', {
			format: checkTargetWithArray,
			fixed(arr, ...args){
				args = limit.flatten(args);
				return limit.filter(arr, (val1) => {
					return whiteBlack(args, val1);
				});
			}
		});
		// 黑名单
		defineIt('blackList', {
			format: checkTargetWithArray,
			fixed(arr, ...args){
				args = limit.flatten(args);
				return limit.filter(arr, (val1) => {
					return !whiteBlack(args, val1);
				});
			}
		});

		// mix: difference [支持obj]
		defineIt('difference', {
			value(arr, ...args){
				args = limit.flatten(args);
				return limit.filter(arr, (val) => {
					return !limit.contains(args, val);
				});
			}
		});

		// mix: remove 
		defineIt('remove', {
			format: checkTargetNoEqualNull,
			fixed(arr, tar, formIndex){
				let index = limit.indexOfSuper(arr, tar, formIndex);
				if(index !== -1){
					try{
						if(limit.isArray(arr)){
							arr.splice(index, 1);
						}else{
							delete arr[index];
						};
						return true;
					}catch(e1){
						try{
							arr[index] = undefined;
							return true;
						}catch(e2){
							limit['T.T'](e1, e2);
						};
					};
				};
				return false;
			}
		});

		// mix: removeAll
		defineIt('removeAll', {
			value(arr, tar){
				if(limit.remove(arr, tar)){
					return limit.removeAll(arr, tar);
				}else{
					return arr; 
				};
			}
		});

		// mix: first [支持obj]
		defineIt('first', {
			format: checkTargetNoEqualNull,
			when: (arr) => limit.isArrayLike(arr),
			priority(arr){
				return arr[0];
			},
			fixed(obj){
				let keys = limit.keys(obj);
				return obj[keys[0]];
			}
		});

		// mix: last [支持obj]
		defineIt('last', {
			format: checkTargetNoEqualNull,
			when: (arr) => limit.isArrayLike(arr),
			priority(arr){
				return arr[arr.length - 1];
			},
			fixed(obj){
				let keys = limit.keys(obj);
				return obj[keys[keys.length - 1]];
			}
		});

		// ES4: push [不改变原数组]
		defineIt('push', {
			format: checkTargetWithArray,
			fixed(){
				Function.call.apply(push, arguments);
				return arguments[0];
			}
		});

		// ES4: pop [不改变原数组]
		defineIt('pop', {
			format: checkTargetWithArray,
			fixed(){
				Function.call.apply(pop, arguments);
				return arguments[0];
			}
		});

		// ES4: unshift [不改变原数组]
		defineIt('unshift', {
			format: checkTargetWithArray,
			fixed(){
				Function.call.apply(unshift, arguments);
				return arguments[0];
			}
		});

		// ES4: shift [不改变原数组]
		defineIt('shift', {
			format: checkTargetWithArray,
			fixed(){
				Function.call.apply(shift, arguments);
				return arguments[0];
			}
		});

		// ES4: reverse [不改变原数组]
		defineIt('reverse', {
			format: checkTargetWithArray,
			fixed(){
				return Function.call.apply(reverse, arguments);
			}
		});

		// ES4: sort [不改变原数组]
		defineIt('sort', {
			format: checkTargetWithArray,
			fixed(){
				return Function.call.apply(sort, arguments);
			}
		});

		// ES4: splice [不改变原数组]
		defineIt('splice', {
			format: checkTargetWithArray,
			fixed(){
				Function.call.apply(splice, arguments);
				return arguments[0];
			}
		});

		// ES4: join [不改变原数组]
		defineIt('join', {
			format: checkTargetWithArray,
			fixed(){
				return Function.call.apply(join, arguments);
			}
		});

		// ES4: concat [不改变原数组]
		defineIt('concat', {
			format: checkTargetWithArray,
			fixed(){
				return Function.call.apply(concat, arguments);
			}
		});

		// ES4: slice [不改变原数组]
		defineIt('slice', {
			format: checkTargetWithArray,
			fixed(){
				return Function.call.apply(slice, arguments);
			}
		});

		// ES5: forEach [支持obj]
		defineIt('forEach', {
			format: checkObjFunction,
			when: (arr) => forEach && arr.forEach === forEach,
			priority(){
				return Function.call.apply(forEach, arguments)
			},
			fixed: (arr, iterator, context) => {
				return limit.isArrayLike(arr) ? limit.each(arr, (val, key) => {
					iterator.call(context, val, +key, arr);	
				}, context) : limit.each(arr, iterator, context);
			}
		});

		// ES5: map [支持obj]
		defineIt('map', {
			format: checkObjFunction,
			when: (arr) => map && arr.map === map,
			priority(){
				return Function.call.apply(map, arguments)
			},
			fixed: (arr, iterator, context) => {
				// 初始化数组
				let result = limit.isArrayLike(arr) ? [] : {};
				// 遍历
				limit.each(arr, function(val, key){
					result[key] = iterator.call(this, val, key, arr);
				}, context);
				return result;
			}
		});

		// ES5: filter [支持obj]
		defineIt('filter', {
			format: checkObjFunction,
			when: (arr) => filter && arr.filter === filter,
			priority(){
				return Function.call.apply(filter, arguments);
			},
			fixed: (arr, iterator, context) => {
				// 初始化数组
				let isArr = limit.isArrayLike(arr),
					result = isArr ? [] : {};
				isArr ? limit.each(arr, function(val, key){
					iterator.call(this, val, key, arr) && result.push(val);
				}, context) : limit.each(arr, function(val, key){
					iterator.call(this, val, key, arr) && (result[key] = val);
				});
				return result;
			}
		});

		// ES5: some [支持obj]
		defineIt('some', {
			format: checkObjFunction,
			when: (arr) => some && arr.some === some,
			priority(){
				return Function.call.apply(some, arguments);
			},
			fixed: (arr, iterator, context) => {
				// 初始化
				let result = false;
				limit.isArrayLike(arr) ? limit._loop(arr, (val, key) => {
					if( iterator.call(context, val, +key, arr) ) return result = true, false;
				}, undefined, true) : limit._loop(arr, (val, key) => {
					if( iterator.call(context, val, key, arr) ) return result = true, false;
				}, undefined, true);
				return result;
			}
		});

		// ES5: every [支持obj]
		defineIt('every', {
			format: checkObjFunction,
			when: (arr) => every && arr.every === every,
			priority(){
				return Function.call.apply(every, arguments)
			},
			fixed: (arr, iterator, context) => {
				// 初始化
				let result = true;
				limit.isArrayLike(arr) ? limit._loop(arr, (val, key) => {
					if( !iterator.call(context, val, +key, arr) ) return result = false;
				}, undefined, true) : limit._loop(arr, (val, key) => {
					if( !iterator.call(context, val, key, arr) ) return result = false;
				}, undefined, true);
				return result;
			}
		});

		// ES5: indexOf [支持obj]
		defineIt('indexOf', {
			format: checkTargetNoEqualNull,
			when: (arr) => indexOf && arr.indexOf === indexOf,
			priority(){
				return Function.call.apply(indexOf, arguments);
			},
			fixed: (arr, ele, formIndex) => {
				// 初始化返回值
				let index = -1;
				limit._loop(arr, (val, key) => {
					if(val === ele) return index = key, false;
				}, undefined, true, checkTrueIndex(arr.length, formIndex));
				// loop为了兼容返回值是string
				return limit.isArrayLike(arr) ? +index : index;
			}
		});

		// ES5: indexOfSuper [支持obj]
		defineIt('indexOfSuper', {
			format: checkTargetNoEqualNull,
			fixed: (arr, ele, formIndex) => {
				// 初始化返回值
				let index = -1;
				limit._loop(arr, (val, key) => {
					if( limit.is(val, ele) ) return index = key, false;
				}, undefined, true, checkTrueIndex(arr.length, formIndex));
				// loop为了兼容返回值是string
				return limit.isArrayLike(arr) ? +index : index;
			}
		});

		// ES5: lastIndexOf
		defineIt('lastIndexOf', {
			format: checkTargetWithArray,
			when: (arr) => lastIndexOf && arr.lastIndexOf === lastIndexOf,
			priority(){
				return Function.call.apply(lastIndexOf, arguments);
			},
			fixed(arr, ele, formIndex){
				formIndex = ~~formIndex;
				let len = arr.length - 1,
					index = limit.indexOf( arr.reverse(), ele, arguments.length === 3 ? len - formIndex : formIndex );
				// 因为是倒叙
				return index === -1 ? -1 : len - index;
			}
		});

		// ES5: reduce
		const ERR_MSG_REDUCE = new TypeError('Reduce of empty array with no initial value');
		defineIt('reduce', {
			format: checkArrFunction,
			when: arr => reduce && arr.reduce === reduce,
			priority(){
				return Function.call.apply(reduce, arguments)
			},
			fixed(arr, iterator, init){
				// 初始化
				let len = arguments.length,
					index = 0,
					noInit = len === 2,
					result = noInit ? arr[index++] : init;
				// 如果只有两个参数且数组为空的话就报错
				if(noInit && arr.length === 0) throw ERR_MSG_REDUCE; 
				// 遍历
				limit._loop(arr, function(val, key){
					result = iterator.call(this, result, val, +key, arr);
				}, undefined, false, index);
				return result;
			}
		});

		// ES5: reduceRight
		defineIt('reduceRight', {
			format: checkArrFunction,
			when: arr => reduceRight && arr.reduceRight === reduceRight,
			priority(){
				return Function.call.apply(reduceRight, arguments)
			},
			fixed(...args){
				let len = args[0].length - 1,
					iterator = args[1];
				args[0].reverse();
				args[1] = (before, val, key, arr) => iterator(before, val, len - key, arr);
				return limit.reduce(...args);
			}
		});

		// ES6: from
		defineIt('from', {
			format: checkObjFunction,
			when: () => !!from,
			priority: (...args) => from(...args),
			fixed(obj, iterator, context){
				let arr = [];
				// 确保是函数
				if( obj && obj.length ){
					// 不考虑IE8的话可以这样写 push.apply(arr, obj);
					push.apply(arr, slice.call(obj));
					return limit.map(arr, iterator, context);
				}else{
					return arr;
				};
			}
		});

		// ES6: of
		defineIt('of', {
			when: () => !!of,
			priority: (...args) => of(...args),
			fixed: (...args) => slice.call(args)
		});

		// ES6: find [支持obj]
		defineIt('find', {
			format: checkObjFunction,
			when: (arr) => find && arr.find === find,
			priority(){
				return Function.call.apply(find, arguments);
			},
			fixed: (arr, iterator, context) => {
				let target;
				limit.some(arr, (val, key, arr) => {
					if( iterator(val, key, arr) ){
						return target = val, true;
					};
				});
				return target;
			}
		});

		// ES6: findIndex [支持obj]
		defineIt('findIndex', {
			format: checkObjFunction,
			when: (arr) => findIndex && arr.findIndex === findIndex,
			priority(){
				return Function.call.apply(findIndex, arguments);
			},
			fixed: (arr, iterator, context) => {
				let target = -1;
				limit.some(arr, (val, key, arr) => {
					if( iterator(val, key, arr) ){
						return target = key, true;
					};
				});
				return target;
			}
		});

		// ES6: fill
		defineIt('fill', {
			format: checkTargetWithArray,
			when: (arr) => fill && arr.fill === fill,
			priority(){
				return Function.call.apply(fill, arguments);
			},
			fixed: (arr, target, start, end) => {
				let arrLen = arr.length;
				// 格式化起点终点
				start = ~~start;
				end = ~~end;
				// 纠正小于零的情况
				start = start < 0 ? arrLen + start : start;
				end = end <= 0 ? arrLen + end : end;
				// 纠正特殊情况
				start < 0 && (start = 0);
				end > arrLen && (end = arrLen);
				let len = end - start;
				// 长度必须大于0
				if(len > 0){
					let arg = limit.from(new Array(len), () => target);
					unshift.call(arg, start, len);
					splice.apply(arr, arg);
				};
				return arr;
			}
		});

		// ES6: includes
		defineIt('includes', {
			when: (arr) => !!arr.includes,
			priority: (arr, target, index) => arr.includes(target, index),
			fixed: (arr, target, index) => {
				if( limit.isString(arr) ){
					return arr.indexOf(target, index) !== -1;
				}else{
					if( !limit.isNaN(target) ){
						return limit.indexOf(arr, target, index) !== -1;
					}else{
						let result = false;
						limit._loop(arr, (val, key) => {
							if( limit.isNaN(val) ) return result = true, false;
						}, undefined, true, checkTrueIndex(arr.length, index));
						return result;
					};
				};		
			}
		});

		// ES6: copyWithin
		defineIt('copyWithin', {
			format: checkTargetWithArray,
			when: (arr) => copyWithin && arr.copyWithin === copyWithin,
			priority(){
				return Function.call.apply(copyWithin, arguments);
			},
			fixed: (arr, target, start, end) => {
				let args = arr.slice(start, end);
				args.unshift(target, args.length);
				splice.apply(arr, args);
				return arr;
			}
		});

	// --函数-- //

		// Promise
		class MyPromise {
			constructor(...args){
				// 状态值
				this.PromiseStatus = 'pedding';
				// 返回值
				this.PromiseValue = undefined;
				// 栈区
				this.Stack = [];
				if( limit.isFunction(args[0]) ){
					this.promiseList = [];
					let fun = args[0];
					let resolve = (val) => {
						limit.each([this].concat(this.promiseList), promise => {
							if(promise.PromiseStatus === 'pedding'){
								promise.PromiseStatus = 'resolved';
								promise.PromiseValue = val;
								promise.cleanStack();
							};
						});
					};
					let reject = (val) => {
						limit.each([this].concat(this.promiseList), promise => {
							if(promise.PromiseStatus === 'pedding'){
								promise.PromiseStatus = 'rejected';
								promise.PromiseValue = val;
								promise.cleanStack();
							};
						});
						setTimeout(() => {
							if(!this.promiseList.length){
								throw '(in promise) ' + val; 
							};
						}, 0);
					};
					try{
						fun(resolve, reject);
					}catch(e){
						this.PromiseStatus = 'rejected';
						this.PromiseValue = e;
					};
				}else{
					this.PromiseStatus = args[0];
					this.PromiseValue = args[1];
				};
			}
			then(suc, err){
				let me = this;
				if(me.promiseList){
					let originMe = me;
					me = new MyPromise(me.PromiseStatus, me.PromiseValue);
					originMe.promiseList.push(me);
				};
				me.Stack.push({suc, err});
				if(me.PromiseStatus !== 'pedding' && !me.cleanStatus){
					me.cleanStack();	
				};
				return me;
			}
			errorBack(){
				let me = this;
				// 如果没有
				if( !me.Stack.length ){
					return setTimeout(() => {
						throw '(in promise) ' + me.PromiseValue;
					}, 0);
				}else{
					return me.cleanStack();
				};
			}
			successBack(){
				let me = this,
					PromiseValue = me.PromiseValue;
				// 如果返回是个promise对象
				if( PromiseValue && PromiseValue.then ){
					PromiseValue.then((val) => {
						me.PromiseValue = val;
						me.PromiseStatus = 'resolved';
					}, (val) => {
						me.PromiseValue = val;
						me.PromiseStatus = 'rejected';
					}).then(() => {
						return me.cleanStack();
					});
				}else{
					return me.cleanStack();
				};
			}
			cleanStack(){
				let me = this,
					one = me.Stack.shift();
				me.cleanStatus = 'init';
				if(one){
					setTimeout(() => {
						try{
							switch(me.PromiseStatus){
								case 'resolved':
									if(one.suc){
										me.PromiseValue = one.suc.call(undefined, me.PromiseValue);
									}else{
										return me.cleanStack();
									};
								break;
								case 'rejected':
									if(one.err){
										me.PromiseValue = one.err.call(undefined, me.PromiseValue);
									}else{
										return me.errorBack();
									};
								break;
							};
							me.PromiseStatus = 'resolved';
						}catch(e){
							me.PromiseStatus = 'rejected';
							me.PromiseValue = e;
							return me.errorBack();
						};
						return me.successBack();
					}, 0);
				}else{
					delete me.cleanStatus;
				};
				return me;
			}
			static all(list){
				let guid = list.length,
					back,
					args = [];
				function main(arg, key){
					args[key] = arg;
					if(!--guid){
						back(args);
					};
				};
				return new MyPromise((resolve, reject) => {
					back = resolve;
					limit.each(list, (val, key) => {
						// Promise对象
						if(val.PromiseStatus){
							val.then(sucVal => {
								main(sucVal, key);
							}, errVal => {
								reject(errVal);
							});
						}else{
							main(val, key);
						};
					});
				});
			}
			static race(list){
				return new MyPromise((resolve, reject) => {
					limit.each(list, val => {
						MyPromise.resolve(val).then( sucVal => resolve(sucVal), errVal => reject(errVal) );
					});
				});
			}
			static resolve(val){
				if(val && val.then){
					return new MyPromise((resolve, reject) => {
						val.then(resolve, reject);
					});
				};
				return new MyPromise((resolve, reject) => {
					resolve(val);
				});
			}
			static reject(val){
				return new MyPromise((resolve, reject) => {
					reject(val);
				});
			}
		};

		MyPromise.prototype['catch'] = function(fn){
			return this.then(null, fn);
		};

		defineIt('promise', {
			when: () => !!WIN.Promise,
			priority: () => Promise,
			fixed: () => MyPromise
		});

		// mix: bind 对bind做了统一兼容处理
		defineIt('bind', {
			format: (fn, ...args) => [limit.cb(fn), ...args],
			when: (fn) => bind && fn.bind === bind,
			priority(...args1){
				function main(...args2){
					return Function.call.apply(bind, [...args1, ...args2])();
				};
				// 咋骗，可以让兼容方法伪装的更像
				main.toString = () => 'function () { [native code] }';
				return main;
			},
			fixed(fn, ...args1){
				// 兼容的方法
				function main(...args2){
					return Function.call.apply( fn, [...args1, ...args2] );
				};
				// 咋骗，可以让兼容方法伪装的更像
				main.toString = () => 'function () { [native code] }';
				return main;
			}
		});

		// mix: compose 组合 a(b(c())) => (a(), b(), c());
		defineIt('compose', {
			value(...args1){
				return function(...args2){
					let result = args2;
					for(let i = args1.length - 1; i >= 0; i--){
						result = [].concat( args1[i].apply(this, result) );
					};
					return result.length <= 1 ? result[0] : result;
				};
			}
		});

	// --字符-- //

		// mix: toString
		defineIt('toString', {
			value(obj){
				// 如果是null或者undefined
				if( obj == null ){
					return '';
				};
				// 如果是字符串
				if( limit.isString(obj) ){
					return obj;
				};
				// 如果是-0的话toString会不正确
				if( limit.is(obj, -0) ){
					return '-0';
				};
				// 如果是对象的话，就出log
				let objStr = '' + obj;
				if( objStr === '[object Object]' ){
					objStr = JSON.stringify(obj);
					typeWarn.toString(obj, objStr);
				};
				return objStr;
			}
		});

		// 解析字符串
		defineIt('parseString', {
			format: checkTargetWithString,
			fixed(str, val1 = '&', val2 = '='){
				str = decodeURIComponent(str);
				let obj = {},
					arr = str.split(val1);
				// 空判断
				if( str === '' ){
					return obj;
				};
				limit.each(arr, (val) => {
					let temp = val.split(val2),
						k = temp[0],
						v = temp[1];
					try{
						v = parse(v);
					}catch(e){};
					// 如果不存在就当对象
					if( limit.isUndefined( obj[k] ) ){
						obj[k] = v; 
					}
					// 如果存在就变成数组
					else{
						if( limit.isArray(obj[k]) ){
							obj[k].push(v);
						}else{
							let cv = obj[k];
							let co = obj[k] = [];
							co.push(cv, v);
						};
					};
				});
				return obj;
			}
		});

		// ES5: trim
		const REG_EXP_TRIM = /^\s+|\s+$/g;
		defineIt('trim', {
			format: checkTargetWithString,
			when: (str) => trim && str.trim === trim,
			priority(){
				return Function.call.apply(trim, arguments);
			},
			fixed: str => str.replace(REG_EXP_TRIM, '')
		});

		// ES6: codePointAt
		// 反编译
		const fixCodePointAt = (codeH, codeL) => {
			codeH = limit.padStart( (codeH & 1023).toString(2), 10, '0' );
			codeL = limit.padStart( (codeL & 1023).toString(2), 10, '0' );
			return ( parseInt(codeH+codeL, 2) + 0x10000 );
		};
		defineIt('codePointAt', {
			format: checkStringNumber,
			when: (str) => codePointAt && str.codePointAt === codePointAt,
			priority(){
				return Function.call.apply(codePointAt, arguments);
			},
			fixed(str, index){
				let code = str.charCodeAt(index);
				if(code >= 0xD800 && code <= 0xDBFF){
					return fixCodePointAt(code, str.charCodeAt(++index));
				}else{
					return code;
				};
			}
		});

		// ES6: fromCodePoint
		// 编译
	 	const parseUnicode = str16 => {
			// 防御如果在 0xFFFF 内的不转义
			if( parseInt(str16, 16) <= 0xFFFF ) return [str16];
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
			when: () => !!fromCodePoint,
			priority: code => fromCodePoint(code),
			fixed(code){
				if( limit.isNaN(code) ){
					throw new RangeError('Invalid code point NaN');
				};
				if( code < 0 || code > 0x10FFFF ){
					throw new RangeError(`Invalid code point ${code}`) 
				};
				code = limit.map(parseUnicode(code.toString(16)), function(val){
					return '\\u' + limit.padStart(val, 4, '0');
				}).join('');
				return new Function(`return "${code}"`)();
			}
		});

		// ES6: repeat
		defineIt('repeat', {
			format: checkStringNumber,
			when: (str) => repeat && str.repeat === repeat,
			priority(){
				return Function.call.apply(repeat, arguments);
			},
			fixed: (str, num) => limit.from(new Array(num), () => str).join('')
		});

		// ES6: padStart 浏览器还未实现
		defineIt('padStart', {
			format: checkPadArgs,
			when: (str) => false && padStart && str.padStart === padStart,
			priority(){
				return Function.call.apply(padStart, arguments);
			},
			fixed(str, leg, arg){
				let max = str.length,
					min;
				// 如果要的长度比原字符小就原始返回
				if(max >= leg){
					return str;
				};
				min = Math.ceil( (leg - max)/arg.length );
				return (limit.repeat(arg, min) + str).slice(-leg);
			}
		});

		// ES6: padEnd 浏览器还未实现
		defineIt('padEnd', {
			format: checkPadArgs,
			when: (str) => false && padEnd && str.padEnd === padEnd,
			priority(){
				return Function.call.apply(padEnd, arguments);
			},
			fixed(str, leg, arg){
				let max = str.length,
					min;
				// 如果要的长度比原字符小就原始返回
				if(max >= leg){
					return str;
				};
				min = Math.ceil( (leg - max)/arg.length );
				return (str + limit.repeat(arg, min)).slice(0, leg);
			}
		});

		// ES6: startsWith
		defineIt('startsWith', {
			format: checkTargetWithString,
			when: (str) => startsWith && str.startsWith === startsWith,
			priority(){
				return Function.call.apply(startsWith, arguments);
			},
			fixed(str, arg, index){
				index = ~~index;
				let result = str.indexOf(arg, index);
				return result !== -1 && result === index;
			}
		});

		// ES6: endsWith
		defineIt('endsWith', {
			format: checkTargetWithString,
			when: (str) => endsWith && str.endsWith === endsWith,
			priority(){
				return Function.call.apply(endsWith, arguments);
			},
			fixed(str, arg, index){
				index = arguments.length === 3 ? ~~index : str.length;
				if(index > str.length){
					index = str.length;
				};
				let leg = index - arg.length,
					result = str.lastIndexOf(arg, leg);
				return result !== -1 && str.lastIndexOf(arg, leg) === leg;
			}
		});

	// --数字-- //

		// mix: toNumber
		defineIt('toNumber', {
			value(obj){
				// 如果是null或者undefined
				if( obj == null ){
					return 0;
				};
				// 如果是数字
				if( limit.isNumber(obj) ){
					return obj;
				};
				// 如果日期或者布尔
				if( limit.isDate(obj) || limit.isBoolean(obj) ){
					return +obj;
				};
				// 如果是字符串
				if( limit.isString(obj) ){
					if( limit.isNumber(+obj) ){
						return +obj;
					};
				};
				typeWarn.toNumber(obj)
				return NaN;
			}
		});

		// mix: random
		defineIt('random', {
			value(form, to){
				// 格式化入参
				form = ~~form; to = ~~to;
				let max = Math.max(form, to),
					min = Math.min(form, to);
				return Math.floor( ( max - min + 1 ) * Math.random() + min );
			}
		});

		// mix: thousandSeparator 
		const REG_THOUSAND_SEPARATOR = /(\d{1,3})(?=(\d{3})+$)/g;
		const REG_THOUSAND_SEPARATOR_COMMA = /,/g;
		defineIt('thousandSeparator', {
			format: checkTargetWithNumber,
			fixed(num, med = 2){
				med = checkPositive(med);
				// 控制入参
				if( !checkFiniteNum(num) ){
					return '';
				};
				num = limit.toFixed(num, med);
				num = num.split('.');
				num[0] = num[0].replace(REG_THOUSAND_SEPARATOR, '$1,');
				return num.join('.');
			}
		});

		defineIt('unThousandSeparator', {
			value: str => limit.toNumber(str.replace(REG_THOUSAND_SEPARATOR_COMMA, ''))
		});

		// 小数点右移
		const movePointRight = (sign, leftStr, rightStr, scale) => {
			//如果 刻度比右边的字符长度小
			if( scale < rightStr.length ){
				return sign + leftStr + rightStr.slice(0, scale) + '.' + rightStr.slice(scale);
			}else{
				return sign + leftStr + limit.padEnd(rightStr, scale, '0');
			};
		};
		
		// 小数点左移
		const movePointLeft = (sign, leftStr, rightStr, scale) => {
			if( leftStr.length > scale ){
				return sign + leftStr.slice(0, -scale) + '.' + leftStr.slice(-scale) + rightStr;
			}else{
				return sign + '0.' + limit.padStart(leftStr, scale, '0') + rightStr;
			};
		};

		// 小数点偏移
		const movePoint = (num, scale) => {
			num = limit.toNumber(num);
			// 控制入参
			if( !checkFiniteNum(num) ){
				return num;
			};
			// 格式化num为字符串
			num = limit.toString(num);
			// 控制入参scale为整数
			scale = ~~scale;
			// 对于0的快速处理
			if(scale === 0){
				return num;
			};
			let leftStr, rightStr, sign = '';
			// 切割字符串
			num = num.split('.');
			leftStr = num[0];
			rightStr = num[1] || '';
			//如果是负数对leftStr的处理
			if( leftStr.charAt(0) === '-' ){
				sign = '-';
				leftStr = leftStr.slice(1);
			};
			return scale < 0 ? movePointLeft(sign, leftStr, rightStr, -scale) : movePointRight(sign, leftStr, rightStr, scale);
		};

		// mix: toFixed
		defineIt('toFixed', {
			value(num, scale){
				// scale为正整数
				scale = checkPositive(scale);
				return movePoint( Math.round( movePoint(num, scale) ) , -scale);
			}
		});

		// 获取最大的小数位
		const getMaxScale = (...args) => {
			if( !checkFiniteNum(args) ){
				return null;
			};
			return Math.max.apply(Math, limit.map( args, (val) => {
				return ( (''+val).split('.')[1] || '').length;
			}) );
		};

		// mix: plus
		defineIt('plus,+', {
			format: checkFlattenArgs,
			fixed(...args){
				let maxScale = getMaxScale(...args);
				if( limit.isNull(maxScale) ){
					return NaN;
				};
				return limit.reduce(args, (before, val) => {
					return +movePoint( +movePoint(before, maxScale) + +movePoint(val, maxScale), -maxScale );
				});
			}
		});

		// mix: minus
		defineIt('minus,-', {
			format: checkFlattenArgs,
			fixed(...args){
				let maxScale = getMaxScale(...args);
				if( limit.isNull(maxScale) ){
					return NaN;
				};
				return limit.reduce(args, (before, val) => {
					return +movePoint( +movePoint(before, maxScale) - +movePoint(val, maxScale), -maxScale );
				});
			}
		});

		// 获取所需要的值
		const getNeedNum = (args, falg) => {
			let tar = limit.toString(args[0]),
				arg = limit.toString(args[1]),
				medTar = ( tar.split('.')[1] || '').length,
				medArg = ( arg.split('.')[1] || '').length;
			let	num = falg ? 
					+movePoint( +tar.replace('.', '') * +arg.replace('.', ''), -(medTar + medArg) ) : 
					+movePoint( +tar.replace('.', '') / +arg.replace('.', ''), (medArg - medTar) );
			args.splice(0, 2 ,num);
			return num;
		};

		// mix: multiply
		defineIt('multiply,*', {
			format: checkFlattenArgs,
			fixed(...args){
				if( !checkFiniteNum(args) ){
					return NaN;
				};
				//格式化数字为字符串
				let num = getNeedNum(args, true);
				return args.length <= 1 ? num : limit['*'](args);
			}
		});

		// mix: multiply
		defineIt('except,/', {
			format: checkFlattenArgs,
			fixed(...args){
				if( !checkFiniteNum(args) ){
					return NaN;
				};
				//格式化数字为字符串
				let num = getNeedNum(args, false);
				return args.length <= 1 ? num : limit['/'](args);
			}
		});

		// mix: 
		// const BRACKETS_REG = /\(((?!.*\().*?)\)/;
		const BRACKETS_REG = /\(([^()]*)\)/;
		const MULTANDDIVISION_REG = /(-?\d+(?:\.\d+)?)(?:\s*)([\*\/])(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)/;
		const EXPRESS_REG = /^(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)([\+\-])(?:\s*)(-?\d+(?:\.\d+)?)(?:\s*)/;
		defineIt('express,?', {
			value(exp){
				// 优先计算*/
				if( MULTANDDIVISION_REG.test(exp) ){
					return limit.express( exp.replace(MULTANDDIVISION_REG, (a, b, c, d) => {
						return limit[c](+b, +d);
					}) );
				};
				// 如果存在()
				if( BRACKETS_REG.test(exp) ){
					return limit.express( exp.replace(BRACKETS_REG, (a, b, c, d) => {
						return limit.express(b);
					}) );
				};
				if( !EXPRESS_REG.test(exp) ){
					return limit.toNumber(exp);
				};
				return limit.express( exp.replace(EXPRESS_REG, (a, b, c, d) => {
					return limit[c](+b, +d);
				}) );
			}
		});

	// --日期-- //
		const REG_EXP_DATA = /^(yyyy)?(?:(.*)(MM))?(?:(.*)(dd))?(?:(.*)(HH))?(?:(.*)(mm))?(?:(.*)(ss))?(.*)?$/;
    	const FUN_DATAS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds'];
		defineIt('formatDate', {
			value(timestamp = new Date().getTime(), formatStr = 'yyyy-MM-dd HH:mm:ss'){
				timestamp = new Date(timestamp);
				formatStr = limit.toString(formatStr);
				if( limit.isNaN(+timestamp) || !REG_EXP_DATA.test(formatStr) ){
					return '';
				};
				// 正常入参
				return formatStr.replace(REG_EXP_DATA, (...args) => {
					let arr = [];
					limit.each(slice.call(args, 1, -2), (val, key) => {
						let value;
						if(val){
							if(key % 2 === 0){
								value = timestamp[ FUN_DATAS[key/2] ]();
								// 如果是月份进一
								val === 'MM' && value++;
								// 如果是非年补零
								val !== 'yyyy' && ( value = limit.padStart(value, 2, '0') );
								arr.push(value);
							}else{
								arr.push(val);
							};
						};
					});
					return arr.join('');
				});
			}
		});

	// 重构limit函数
	limit.each(limit, (val, key) => {
		if( limit.isFunction(val) ){
			limit.prototype[key] = function(...args){
				this.__value__.push( limit[key]( ...[limit.last(this.__value__), ...args] ) );
				return this;
			};
		}else{
			limit.prototype[key] = val;
		};
	});
	limit.assign(limit.prototype, {
		end(){
			this.__value__.pop();
			return this;
		},
		valueOf(){
			return limit.last(this.__value__);
		},
		getValue(){
			return this.valueOf();
		},
		toLog(){
			limit['...']( this.valueOf() );
			return this;
		},
		toStringLog(){
			limit['...']( JSON.stringify(this.valueOf()) );
			return this;
		}
	});

	// 对IE下 JSON.stringify 的修复
	;(function(JSON){
		let rex = /(\\u\w{4})/g;
		JSON.stringify = function(json){
			if( json == null ){
				json = '';
			};
			return stringify(json).replace(rex, function(a){
				return new Function('return "'+a+'"')();
			});
		};
	})(JSON);

})(window);