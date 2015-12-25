"use strict";
/**
 * 2015.10.8
 * 对ES的增强
 * version: 1.0.0
 */
define(function(require, exports) {

	// 变量
	var limit = {};

	// 原型对象
	var	arrayProto 		= Array.prototype,
		objectProto 	= Object.prototype,
		functionProto 	= Function.prototype,
		stringProto 	= String.prototype;

	// DOM对象
	var WIN = window,
		DOC = WIN.document;

	// 原生原有的方法
	var slice 			= arrayProto.slice,
		splice 			= arrayProto.splice,
		concat 			= arrayProto.concat,
		unshift 		= arrayProto.unshift,
		push			= arrayProto.push,
		toString 		= objectProto.toString,
		hasOwnProperty 	= objectProto.hasOwnProperty;

	// 原生ES5+的方法
	var nativeKeys 			= Object.keys,
		nativeCreate 		= Object.create,
		nativeForEach 		= arrayProto.forEach,
		nativeIndexOf 		= arrayProto.indexOf,
		nativeLastIndexOf 	= arrayProto.lastIndexOf,
		nativeMap 			= arrayProto.map,
		nativeFilter 		= arrayProto.filter,
		nativeEvery 		= arrayProto.every,
		nativeSome 			= arrayProto.some,
		nativeReduce 		= arrayProto.reduce,
		nativeReduceRight 	= arrayProto.reduceRight,
		nativeBind 			= functionProto.bind,
		nativeTrim 			= stringProto.trim;

	// 原生ES6+的方法
	var nativeCodePointAt	= stringProto.codePointAt,
		nativeFromCodePoint = String.fromCodePoint,
		nativeIncludes 		= stringProto.includes,
		nativeStartsWith 	= stringProto.startsWith,
	 	nativeEndsWith 		= stringProto.endsWith,
	 	nativeRepeat		= stringProto.repeat,
	 	nativePadStart		= stringProto.padStart,
	 	nativePadEnd 		= stringProto.padEnd;

	// 空函数
	var K = limit.K = function(k){return k};

	// 控制回调
	var cb = limit.cb = function(callback){return isFunction(callback) ? callback : K;};

	// 空对象
	var O = limit.O = {};

	// 控制台
	var log = limit.log = function(){
		if(limit.logClosed) return;
		var args = slice.call(arguments),
			type = args.shift(),
			con = console || O,
			log;
		// 对type的处理可选值 'error'[默认]|'log'|'warn'
		// 这里可以优化用
		if( !contains(['error', 'log', 'warn'], type) ){
			args.unshift(type);
			type = 'error';
		};
		log = con[type] || K;
		// IE10下的IE8调试模式，console.log是个对象 纯IE8下 log = K;
		try{
			args.unshift('limitJS ' + type + ':');
			log.apply(con, args);
		}catch(e){
			log('limitJS ', args);
		};
	};

	// 警告
	var typeWarn = {
		toString: function(obj){
			return log('warn', obj, 'change into', '\''+obj+'\'', 'limit.toString is called');
		},
		toArray:  function(obj){
			return log('warn', obj, 'change into []', 'limit.toArray is called');
		}
	};

	///////////////////////////////////////////////////////
	// 基础判断方法
	// 基础类型 isString[字符] isUndefined[未定义] isNull[空] isBoolean[布尔] isNumber[数字] isDefined[定义]
	// 引用类型 isArray[数组] isFunction[函数] isObject[对象] isData[日期] isRegexp[正则] isError[错误]
	// 特殊的有 isArrayLike[类数组] isNaN[非数字] isFinite[有限数] isElement[元素] isArguments[参数] isMath[数学]
	// 增加判断 isEmpty[无] isEqual[是否一致] isBase[是否是基础类型]
	//////////////////////////////////////////////////////

		// 是否是未定义undefined
		var isUndefined = limit.isUndefined = function(n){
			return n === void 0;
		};

		// 是否是定义
		var isDefined = limit.isDefined = function(n){
			return !isUndefined(n);
		};

		// 是否是空null
		var isNull = limit.isNull = function(n){
			return n === null;
		};

		// 是否是函数function
		var isFunction = limit.isFunction = function(n){
			return typeof n === 'function';
		};

		// 是否是布尔boolean
		var isBoolean = limit.isBoolean = function(n){
			return n === true || n === false || toString.call(n) === '[object Boolean]';
		};

		// 是否是这些[string number array data regexp error]对象
		'String,Number,Array,Date,RegExp,Error,Math'.replace(/\w+/g, function(k){
			limit['is' + k] = function(n){
				return toString.call(n) === '[object '+k+']';
			};
		});

		var isNumber 	= limit.isNumber,
			isArray 	= limit.isArray,
			isDate 		= limit.isDate,
			isMath		= limit.isMath,
			isError	 	= limit.isError,
			isRegExp 	= limit.isRegExp,
			isString	= limit.isString;

		// 是否是对象 除了5种基本类型以外都是对象
		var isObject = limit.isObject = function(n){
			// typeof运算 function['function'] null['object'] 会有错误，对其进行纠正 还有个简单判断是 Object(n) === n;
			return isFunction(n) || typeof n === 'object' && !!n;
		};

		// 是否是参数
		var isArguments = limit.isArguments = function(n){
			return has(n, 'callee');
		};

		// 是否是类数组
		// 有 length 属性的有
		// string array arguments nodeList jObject window[排除] function[排除]
		var isArrayLike = limit.isArrayLike = function(n){
			// 和underscore不同，我把function排除了
			return !!n && isNumber(n.length) && !isFunction(n) && !isWin(n);
		};

		// 是否是NaN
		var limitIsNaN = limit.isNaN = Number.isNaN || function(n){
			// 由于isNaN方法会预先 Number(n) 再去做判断 所以导致有些变量(+null = 0);返回错误
			return isNumber(n) && isNaN(n);
		};

		// 是否是有限的
		var limitIsFinite = limit.isFinite = Number.isFinite || function(n){
			return isNumber(n) && isFinite(n);
			// 原始逻辑 对 '1' 返回true
			// return isFinite(n) && !isNaN(parseFloat(n));
		};

		// 是否为整数
		var isInteger = limit.isInteger = Number.isInteger || function(n){
			return limitIsFinite(n) && Math.floor(n) === n;
		};

		// 是否为安全整数
		limit.isSafeInteger = Number.isSafeInteger || function(n){
			return isInteger(n) && -9007199254740992 < n && n < 9007199254740992;
		};

		// 是否是空
		var isEmpty = limit.isEmpty = function(n){
			// 如果是null undefined 为空
			if(n == null) return true;
			// 如果是类数组对象就比较是否为0, 其余的对象看他的静态方法
			return size(n) === 0;
		};

		// 是否是DOM元素
		limit.isElement = function(n){
			return !!n && n.nodeType === 1;
		};

		// 判断是否是docuemtn
		limit.isDocument = function(n){
			return !!n && n.nodeType === 9;
		};

		// 判断是否是window
		var isWin = limit.isWin = function(n){
			// IE8 下 window.self === window // false
			return !!n && n.window === n && n.self == n;
		};

		// 比较 Sting Number Boolean 这三种类型 值转换比较 new String('123') == '123'
		var equalBaseArr = ['String', 'Number', 'Boolean'];

		// 判断基础类型
		function equalBase(a, b, type){
			var fn = WIN[type];
			return fn(a) === fn(b);
		};

		// 比较对象
		function equal(a, b){
			return size(a) === size(b) && every( getLoopKey(a), function(val, key){
				return isEqual(a[val], b[val]);
			});
		};

		// 比较 注意: == 两个等号比较的时候 [2] == 2 返回为true
		var isEqual = limit.isEqual = function(a, b){
			log('log', 'limit.isEqual is called ', typeof a, ':', a, typeof b, ':', b);
			// 类型一致，值相同
			if(a === b) return true;
			// 类型不一致
			if( toString.call(a) !== toString.call(b) ) return false;
			// 特殊类型 NaN 
			if( limitIsNaN(a) ) return true;
			// 基础类型String Number Boolean
			var type;
			if( type = isBase(a, equalBaseArr) ) return equalBase(a, b, type);
			// 特殊类型 date
			if( isDate(a) ) return +a === +b;
			// 特殊类型 regExp
			if( isRegExp(a) ) return ''+a === ''+b;
			// 特殊类型 function
			if( isFunction(a) && (''+a !== ''+b) ) return false;
			// 类数组以及其他
			return equal(a, b);
		};

		// 是否是基础类型
		var baseArr = ['String', 'Number', 'Boolean', 'Null', 'Undefined', 'RegExp', 'Date', 'Math', 'Error'];
		
		var isBase = limit.isBase = function(n, list){
			!isArray(list) && (list = baseArr);
			var type = '';
			// 默认是8种
			some(list, function(val, key){
				var fn = limit['is'+val];
				return fn && fn(n) && (type = val);
			});
			return type;
		};

	/////////////////
	// 字符串的方法
	// trim[去掉头尾空格] 
	// codePointAt[字符串获取编码] fromCodePoint[编码转换成字符串] includes[包含] startsWith[开始] endsWith[结束]
	// repeat[重复] padStart[前补] padEnd[后补]
	////////////////

		// 转义成字符串
		var limitToString = limit.toString = function(obj){
			return isString(obj) ? obj : ( typeWarn.toString(obj), ''+obj );
		};

		// 去除两边的空格
		var REG_EXP_TRIM = /^\s+|\s+$/g;
		var trim = limit.trim = function(n){
			// 格式化参数
			n = arguments.length ? (n + '') : '';
			if(nativeTrim) return nativeTrim.call(n);
			return n.replace(REG_EXP_TRIM, '');
		};

		// 反编译
		function fixCodePointAt(codeH, codeL){
			codeH = padStart( (codeH & 1023).toString(2), '0', 10 );
			codeL = padStart( (codeL & 1023).toString(2), '0', 10 );
			return ( parseInt(codeH+codeL, 2) + 0x10000 ).toString(16);
		};

		// 获取字符编码
		limit.codePointAt = function(str, index){
			str = limitToString(str);
			index = ~~index;
			if(!nativeCodePointAt){
				return nativeCodePointAt.call(str, index).toString(16);
			}else{
				var code = str.charCodeAt(index);
				if(code >= 0xD800 && code <= 0xDBFF){
					return fixCodePointAt(code, str.charCodeAt(++index));
				}else{
					return code.toString(16);
				};
			};
		};

		// 编译
		function parseUnicode(str16){
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

		// 通过编码获取字符
		limit.fromCodePoint = function(code){
			// 必须是有限的数字
			if(!isFinite(code)) return log('warn', code, 'the code must be a number'), '';
			if(nativeFromCodePoint){
				return nativeFromCodePoint.call(String, code);
			}else{
				code = map(parseUnicode(code.toString(16)), function(val){
					return '\\u' + val;
				}).join('');
				return new Function('return "' + code + '"')();
			};
		};

		// 包含
		limit.includes = function(str, arg, index){
			str = limitToString(str);
			if(nativeIncludes){
				return nativeIncludes.call(str, arg, index);
			}else{
				return str.indexOf(arg, index) !== -1;				
			};
		};

		// 开头
		limit.startsWith = function(str, arg, index){
			str = limitToString(str);
			if(nativeStartsWith){
				return nativeStartsWith.call(str, arg, index);
			}else{
				index = ~~index;
				return str.indexOf(arg, index) === index;
			};
		};

		// 结尾
		limit.endsWith = function(str, arg, index){
			str = limitToString(str);
			if(nativeEndsWith){
				return nativeEndsWith.call(str, arg, index);
			}else{
				index = arguments.length === 3 ? ~~index : str.length;
				var leg = index - arg.length;
				return str.lastIndexOf(arg, leg) === leg;
			};
		};

		// 重复
		var repeat = limit.repeat = function(str, leg){
			str = limitToString(str);
			// 格式化为正整数
			leg = positive(leg);
			if(nativeRepeat){
				return nativeRepeat.call(str, leg);
			}else{
				var arr = new Array(leg),
					tem = [];
				// 正确的塞入值
				Array.prototype.push.apply(tem, arr);
				// 返回
				return tem.map(function(){ return str }).join('');
			};
		};


		// 前补后补的耦合方法
		function padStartEnd(str, arg, leg, flag){
			str = limitToString(str);
			arg = limitToString(arg);
			leg = ~~leg;
			var max = str.length,
				min,
				nativeMethod = flag ? nativePadStart : nativePadEnd;
			// 如果要的长度比原字符小就原始返回
			if(max >= leg){
				return str;
			};
			if(nativeMethod){
				return nativeMethod.call(str, arg, leg);
			}else{
				min = Math.ceil( (leg - max)/arg.length );
				return flag ? (repeat(arg, min) + str).slice(-leg) : (str + repeat(arg, min)).slice(0, leg);
			};
		};

		// 前补
		var padStart = limit.padStart = function(str, arg, leg){
			return padStartEnd(str, arg, leg, true);
		};

		// 后补
		var padEnd = limit.padEnd = function(str, arg, leg){
			return padStartEnd(str, arg, leg, false);
		};

	///////////////
	// 数字的方法
	// random[随机数] toFixed[四舍五入最后几位] plus[加] minus[减] multiply[乘] except[除]
	// thousandSeparator[千分位] unThousandSeparator[逆千分位]
	//////////////

		// 随机数
		var random = limit.random = function(form, to){
			// 格式化入参
			form = ~~form; to = ~~to;
			var max = Math.max(form, to),
				min = Math.min(form, to);
			return Math.floor( ( max - min + 1 ) * Math.random() + min );
		};

		var REG_THOUSAND_SEPARATOR = /(\d{1,3})(?=(\d{3})+$)/g,
			REG_THOUSAND_SEPARATOR_POINT = /(\d{1,3})(?=(\d{3})+\.)/g,
			REG_THOUSAND_SEPARATOR_COMMA = /,/g;
		// 千分位
		limit.thousandSeparator = function(num, med){
			// 控制入参
			if( !limitIsFinite(num) ) return log('warn', 'limit.thousandSeparator is called ', typeof num, ':', num), '';
			if( !isNumber(med) ) med = 2;
			// 格式化
			return toFixed(num, med).replace(med ? REG_THOUSAND_SEPARATOR_POINT : REG_THOUSAND_SEPARATOR, '$1,');
		};

		// 反千分位
		limit.unThousandSeparator = function(str){
			// 控制入参
			if( !isString(str) ) return log('warn', 'limit.unThousandSeparator is called ', typeof str, ':', str), NaN;
			return +str.replace(REG_THOUSAND_SEPARATOR_COMMA, '');
		};

		// 数字的运算
		// 填充字符
		function padChar(n, len){
			// 控制入参
			n == null && (n = '');
			n += '';
			len = ~~len;
			// 这个更快
			while(n.length < len){
				n += n;
			};
			return n.slice(0, len);
		};

		// 确保为正整数
		function positive(num){
			num = ~~num;
			return num < 0 ? 0 : num;
		};

		// 确认参数为数字
		function checkNum(){
			var flag = true;
			breakEach(concat.apply(arrayProto, arguments), function(val){
				if( !limitIsFinite(val) ) return log('warn', val, 'the num is not a finite number' ), flag = false;
			});
			return flag;
		};

		// 获取最大的小数位
		function getMaxScale(){
			if( !checkNum.apply(undefined, arguments) ) return;
			return Math.max.apply(Math, map(arguments, function(val){
				return ( (''+val).split('.')[1] || '').length;
			}) );
		};

		// 小数点右移
		function movePointRight(sign, leftStr, rightStr, scale){
			//如果 刻度比右边的字符长度小
			if( scale < rightStr.length ){
				return sign + leftStr + rightStr.slice(0, scale) + '.' + rightStr.slice(scale);
			}else{
				return sign + leftStr + padEnd(rightStr, '0', scale);
			};
		};
		
		// 小数点左移
		function movePointLeft(sign, leftStr, rightStr, scale){
			if( leftStr.length > scale ){
				return sign + leftStr.slice(0, -scale) + '.' + leftStr.slice(-scale) + rightStr;
			}else{
				return sign + '0.' + padStart(leftStr, '0', scale) + rightStr;
			};
		};

		// 小数点偏移
		function movePoint(num, scale){
			// 控制入参
			if( !checkNum(num) ) return;
			// 格式化num为字符串
			num += '';
			// 控制入参scale为整数
			scale = ~~scale;
			// 对于0的快速处理
			if(scale === 0) return num;
			var leftStr, 
				rightStr, 
				sign = '';
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

		// chrome下0.295.toFixed(2) => 0.29这里做了兼容
		var toFixed = limit.toFixed = function(num, scale){
			// 控制入参size为正整数
			scale = positive(scale);
			var num = movePoint(num, scale);
			return isUndefined(num) ? num : movePoint( Math.round( num ) , -scale);
		};

		// 加
		limit.plus = function(){
			var maxScale = getMaxScale.apply(undefined, arguments);
			if( isUndefined(maxScale) ) return;
			return reduce.call(undefined, arguments, function(before, val){
				return +movePoint( +movePoint(before, maxScale) + +movePoint(val, maxScale), -maxScale );
			});
		};
		
		// 减
		limit.minus = function(){
			var maxScale = getMaxScale.apply(undefined, arguments);
			if( isUndefined(maxScale) ) return;
			return reduce.call(undefined, arguments, function(before, val){
				return +movePoint( +movePoint(before, maxScale) - +movePoint(val, maxScale), -maxScale );
			});
		};

		// 获取所需要的值
		function getNeedNum(args, falg){
			var tar = args[0] + '',
				arg = args[1] + '',
				medTar = ( tar.split('.')[1] || '').length,
				medArg = ( arg.split('.')[1] || '').length,
				num = falg ? 
					+movePoint( +tar.replace('.', '') * +arg.replace('.', ''), -(medTar + medArg) ) : 
					+movePoint( +tar.replace('.', '') / +arg.replace('.', ''), (medArg - medTar) );
			args.splice(0, 2 ,num);
			return num;
		};

		// 乘
		var multiply = limit.multiply = function(){
			if( !checkNum.apply(undefined, arguments) ) return;
			//格式化数字为字符串
			var args = toArray(arguments),
				num = getNeedNum(args, true);
			return args.length <= 1 ? num : multiply.apply(undefined, args );
		};

		// 除
		var except = limit.except = function(){
			if( !checkNum.apply(undefined, arguments) ) return;
			//格式化数字为字符串
			//格式化数字为字符串
			var args = toArray(arguments),
				num = getNeedNum(args, false);
			// 如果计算结果为无线的情况反正真实值
			if( limitIsNaN(num) ) return args[0] / args[1];
			return args.length <= 1 ? num : except.apply(undefined, args );
		};

	///////////////
	// 对象的方法
	// has[含有静态方法] create[实例化] forIn[遍历] keys[静态属性] size[静态属性的个数] 
	// each[遍历静态属性] breakEach[可断开的遍历静态属性] extend[继承] defaults[反继承] clone[浅克隆] copy[深拷贝] getObject[安全获取对象]
	//////////////

		// 静态方法
		var has = limit.has = function(n, k){
			// 排除null & undefined 他俩没有hasOwnProperty方法
			return n != null && hasOwnProperty.call(n, k);
		};

		// 空的构造函数
		var E = function(){};

		// 简单的创建原型链对象
		// 和原生的差别是prop原生的可以入参为null而兼容方法不行 这里做了控制
		var create = limit.create = function(prop){
			// 控制入参
			if(prop == null) return {};
			//如果存在原生的方法
			if (nativeCreate) {
				return nativeCreate(prop);
			} else if (prop.__proto__) {
				return {
					__proto__: prop
				};
			} else {
				E.prototype = prop;
				return new E();
			};
		};

		// 遍历
		var forIn = limit.forIn = function(obj, iterator, context){
			// 排除 null undefined
			if( obj == null ) return obj;
			for(var key in obj){
				iterator.call(context, obj[key], key, obj);
			};
			return obj;
		};

		// 获取对象的静态属性
		// string array arguments nodeList 这三者只会查询到遍历值
		// 也就是说原生的类数组对象只会获取到遍历值
		var keys = limit.keys = function(obj){
			// 排除 null undefined
			if( obj == null ) return [];
			// 如果有原生的方法
			if(nativeKeys) return nativeKeys.call(Object, obj);
			var arr = [];
			forIn(obj, function(val, key){ has(obj, key) && arr.push(key) });
			return arr;
		};

		// 键名的数量
		var size = limit.size = function(obj){
			return getLoopKey(obj).length;
		};

		// 获取键值
		function getLoopKey(obj){
			return isArrayLike(obj) ? keys( toArray(obj) ) : keys(obj);
		};

		// 私有遍历
		function loop(obj, iterator, context, isBreak, begin){
			// 循环遍历
			var target = getLoopKey(obj),
				key, num = ~~begin, len = target.length;
			for(; num < len; num++){
				key = target[num];
				if( iterator.call(context, obj[key], key, obj) === false && isBreak ) break;
			};
		};

		// 遍历
		var each = limit.each = function(obj, iterator, context){
			// 确保是函数
			iterator = cb(iterator);
			// 如果是类数组且原生的forEach存在
			if( isArrayLike(obj) && nativeForEach ) return nativeForEach.call(obj, function(val, key){
				// 由于原生forEach key的类型是数字型，所以进行下格式化
				iterator.call(this, val, ''+key);
			}, context);
			// 循环遍历
			return loop(obj, iterator, context);
		};

		// 可以被断开的遍历
		var breakEach = limit.breakEach = function(obj, iterator, context){
			// 循环遍历
			return loop(obj, iterator, context, true);
		};

		// 继承 isOwn 控制是否是静态属性
		var extend = limit.extend = function(obj, isOwn){
			// 控制入参
			if( !isObject(obj) ) return obj;
			// 主函数
			function main(val, key){obj[key] = val};
			// 默认是全部拷贝
			if(isOwn !== true){
				each(slice.call(arguments, 1), function(val) {
					// 继承所有的方法属性
					forIn(val, main);
				});
			}else{
				each(slice.call(arguments, 2), function(val) {
					// 继承静态的方法属性
					each(val, main);
				});
			};
			return obj;
		};

		// 反继承，继承的反意版
		var defaults = limit.defaults = function(obj, isOwn){
			// 控制入参
			if( !isObject(obj) ) return obj;
			// 主函数
			function main(val, key){isUndefined(obj[key]) && (obj[key] = val)};
			// 默认是全部拷贝
			if(isOwn !== true){
				each(slice.call(arguments, 1), function(val) {
					// 继承所有的方法属性
					forIn(val, main);
				});
			}else{
				each(slice.call(arguments, 2), function(val) {
					// 继承静态的方法属性
					each(val, main);
				});
			};
			return obj;
		};

		// 浅拷贝
		var clone = limit.clone = function(obj){
			// 如果是基础对象
			if( isBase(obj) ){
				return copy(obj);
			};
			// 如果是函数
			if( isFunction(obj) ){
				return extend( function(){ return obj.apply(this, arguments) }, obj );
			}; 
			// 函数
			if( isArray(obj) ){
				return slice.call(obj);
			};
			// 其他
			return extend({}, obj);
		};

		// 深拷贝
		var copyArr = ['String', 'Number', 'Boolean', 'Null', 'Undefined'];

		var copy = limit.copy = function(obj){
			var type;
			// 如果是5个基础对象
			if( type = isBase(obj, copyArr) ){
				// 如果是对象
				return isObject(obj) ? new WIN[type]( obj.valueOf() ) : obj;
			};
			// 如果是Math对象
			if( isMath(obj) ){
				return obj;
			};
			// 如果是正则对象
			if( isRegExp(obj) ){
				return new RegExp( obj.source, (obj.global ? 'g' : '') + (obj.multiline ? 'm' : '') + (obj.ignoreCase ? 'i' : '') );
			};
			// 如果是日期对象
			if( isDate(obj) ){
				return new Date( obj.getTime() );
			};
			// 如果是错误对象
			if( isError(obj) ){
				return new Error( obj.message );
			};
			var value = {};
			// 如果是数组
			if( isArray(obj) ){
				value = [];
			};
			// 如果是函数
			if( isFunction(obj) ){
				value = function(){ return obj.apply(this, arguments) };
			};
			// 拷贝属性
			forIn(obj, function(val, key){ value[key] = copy(val) });
			return value;
		};

		// 安全获取对象
		limit.getObject = function(obj){
			breakEach(slice.call(arguments, 1), function(val){
				try{
					obj = obj[val];
				}catch(e){
					return obj = undefined, false;
				};
			});
			return obj;
		};
	
	///////////////
	// 数组的方法
	// toArray[格式化数组] getArray[正确获取数组] indexOf[查询遍历值]√ lastIndexOf[往后查询遍历值] 
	// forEach[遍历] map[重组]√ filter[赛选]√ every[全部符合]√ some[部分符合]√ 
	// reduce[从左往右迭代] reduceRight[从右往左迭代] contains[是否在数组当中]√ union[去重] flatten[解除嵌套数组]
	// whiteList[白名单] blackList[黑名单]
	//////////////

		// 转化数组 [不改变原数组]
		var from = limit.from = Array.from || function(obj, iterator, context){
			var arr = [];
			// 确保是函数
			iterator = cb(iterator);
			if( obj && obj.length ){
				// 不考虑IE8的话可以这样写 push.apply(arr, obj);
				push.apply(arr, slice.call(obj));
				return map(arr, iterator, context);
			}else{
				return arr;
			};
		};

		// 正确初始化数组 [不改变原数组]
		limit.of = Array.of || function(){
			return slice.call(arguments);
		};

		// 格式化数组 会影响的类型:string nodeList jObject arguments
		var toArray = limit.toArray = function(obj){
			// 如果是数组原始返回
			if(isArray(obj)){
				return obj
			}
			// 如果是类数组对象的话就格式化数组
			else if(isArrayLike(obj)){
				return slice.call(obj)
			}else{
				return ( typeWarn.toArray(obj), [] );
			};
		};

		// 获取数组
		var getArray = limit.getArray = function(arr){
			// 控制入参
			arr = toArray(arr);
			switch(arr.length){
				case 0: return null;
				case 1: return arr[0];
				default: return arr;
			};
		};

		// 获取正序遍历值
		var indexOf = limit.indexOf = function(arr, ele, formIndex){
			// 如果是空就直接返回
			if( isEmpty(arr) ) return -1;
			// 控制入参
			isArrayLike(arr) && ( arr = toArray(arr) );
			// 如果原生的方法存在
			if(nativeIndexOf === arr.indexOf) return nativeIndexOf.apply( arr, slice.call(arguments, 1) );
			// 初始化返回值
			var isArr = isArray(arr),
				index = -1;
			loop(arr, function(val, key){
				if(val === ele) return index = key, false;
			}, undefined, true, ~~formIndex);
			// loop为了兼容返回值是string
			return isArr ? +index : index;
		};

		// 获取倒叙遍历值
		var lastIndexOf = limit.lastIndexOf = function(arr, ele, formIndex){
			// 控制入参
			arr = toArray(arr);
			// 如果原生的方法存在
			if(nativeLastIndexOf) return nativeLastIndexOf.apply( arr, slice.call(arguments, 1) );
			// 初始化返回值
			formIndex = ~~formIndex;
			var len = arr.length - 1,
				index = indexOf( arr.reverse(), ele, arguments.length === 3 ? len - formIndex : formIndex );
			// 因为是倒叙
			return index === -1 ? -1 : len - index;
		};

		// 数组遍历
		var forEach = limit.forEach = function(arr, iterator, context){
			// 控制入参
			arr = toArray(arr);
			// 确保是函数
			iterator = cb(iterator);
			// 原生的方法存在
			return each(arr, function(val, key){
				// each的key都是string如果是数组的就格式化这也是each和forEach的一点区别
				iterator.call(this, val, +key, arr);
			}, context);
		};

		// 遍历替换 支持对象√ [不改变原数组]
		var map = limit.map = function(arr, iterator, context){
			// 如果是空就直接返回
			if( isEmpty(arr) ) return arr;
			// 控制入参
			isArrayLike(arr) && ( arr = toArray(arr) );
			// 确保是函数
			iterator = cb(iterator);
			// 如果有原生方法
			if(nativeMap === arr.map) return nativeMap.call( arr, iterator, context );
			// 初始化数组
			var isArr = isArray(arr),
				result = isArr ? [] : {};
			// 遍历
			each(arr, function(val, key){
				result[key] = iterator.call(this, val, key, arr);
			}, context);
			return result;
		};

		// 筛选 [不改变原数组]
		var filter = limit.filter = function(arr, iterator, context){
			// 如果是空就直接返回
			if( isEmpty(arr) ) return arr;
			// 控制入参
			isArrayLike(arr) && ( arr = toArray(arr) );
			// 确保是函数
			iterator = cb(iterator);
			// 如果有原生方法
			if(nativeFilter === arr.filter) return nativeFilter.call( arr, iterator, context );
			// 初始化数组
			var isArr = isArray(arr),
				result = isArr ? [] : {};
			isArr ? each(arr, function(val, key){
				iterator.call(this, val, key, arr) && result.push(val);
			}, context) :  each(arr, function(val, key){
				iterator.call(this, val, key, arr) && (result[key] = val);
			});
			return result;
		};

		// 全部为真 支持对象√
		var every = limit.every = function(arr, iterator, context){
			// 如果是空直接返回
			if( isEmpty(arr) ) return false;
			// 控制入参
			isArrayLike(arr) && ( arr = toArray(arr) );
			// 确保是函数
			iterator = cb(iterator);
			// 如果有原生方法
			if(nativeEvery === arr.every) return nativeEvery.call( arr, iterator, context );
			// 初始化
			var result = true, isArr = isArray(arr);
			breakEach(arr, function(val, key){
				if( !iterator.call(this, val, (isArr ? +key : key), arr) ) return result = false;
			}, context);
			return result;
		};

		// 部分为真 支持对象√
		var some = limit.some = function(arr, iterator, context){
			// 如果是空直接返回
			if( isEmpty(arr) ) return false;
			// 控制入参
			isArrayLike(arr) && ( arr = toArray(arr) );
			// 确保是函数
			iterator = cb(iterator);
			// 如果有原生方法
			if(nativeSome === arr.some) return nativeSome.call( arr, iterator, context );
			// 初始化
			var result = false, isArr = isArray(arr);
			breakEach(arr, function(val, key){
				if( iterator.call(this, val, (isArr ? +key : key), arr) ) return result = true, false;
			}, context);
			return result;
		};

		// 从左到右拼接数组
		var ERR_MSG_REDUCE = new TypeError('Reduce of empty array with no initial value');
		var	reduce = limit.reduce = function(arr, iterator, init){
			// 控制入参
			arr = toArray(arr);
			// 确保是函数
			var args = slice.call(arguments, 1);
			args[0] = iterator = cb(iterator);
			// 如果有原生方法
			if(nativeReduce) return nativeReduce.apply( arr, args );
			// 初始化
			var len = args.length,
				index = 0,
				noInit = len === 1,
				result = noInit ? arr[index++] : init;
			// 如果只有两个参数且数组为空的话就报错
			if(noInit && arr.length === 0) throw ERR_MSG_REDUCE; 
			// 遍历
			loop(arr, function(val, key){
				result = iterator.call(this, result, val, +key, arr);
			}, undefined, false, index);
			return result;
		};

		// 从右到做拼接数组 依赖：reduce
		var reduceRight = limit.reduceRight = function(arr, iterator, init){
			// 控制入参
			arr = toArray(arr);
			// 确保是函数
			var args = slice.call(arguments, 1);
			args[0] = iterator = cb(iterator);
			// 如果有原生方法
			if(nativeReduceRight) return nativeReduceRight.apply( arr, args );
			var len = arr.length - 1;
			args.unshift( arr.reverse() );
			args[1] = function(before, val, key, arr){
				return iterator(before, val, len - key, arr);
			};
			return reduce.apply(undefined, args);
		};

		// 包含
		var contains = limit.contains = function(arr, target){
			return indexOf(arr, target) !== -1;
		};

		// 不同的值 [不改变原数组]
		var difference = limit.difference = function(arr){
			// 控制入参
			arr = toArray(arr);
			var result = concat.apply(arrayProto, slice.call(arguments, 1));
			return filter(arr, function(val){
				return !contains(result, val);
			});
		};

		// 不同的值  [修改变原数组]
		limit.without = function(arr){
			var result = difference.apply(undefined, arguments);
			arr.length = 0;
			push.apply(arr, result);
			return arr;
		};

		// 去重 [不改变原数组]
		var union = limit.union = function(arr, isEasy){
			// 控制入参
			arr = toArray(arr);
			var target;
			// 如果是简单模式速度会很快
			if(isEasy){
				return filter(arr.sort(), function(val, key){
					return (!key || target !== val) && (target = val, true);
				});
			}else{
			// 安全模式默认是安全模式
				target = [];
				return filter(arr, function(val, key){
					return !contains(target, val) && (target.push(val), true);
				});
			};
		};

		// 降位 [[[1]]] => 1
		var flatten = limit.flatten = function(){
			var value = [];
			forEach(arguments, function(val, key){
				// concate 可以少几次循环
				push.apply( value, isArray(val) ? flatten.apply( undefined, concat.apply(arrayProto, val) ) : [val] );
			});
			return value;
		};

		// 黑白名单判断
		function whiteBlack(factor, val1){
			return some(factor, function(val2){
				return every(val2, function(val3, key3){
					return val3 === val1[key3];
				});
			});
		};

		// 数据白名单  [不改变原数组]
		// limit.whiteList([], {}, {}, {});
		// limit.whiteList([], [{}, {}, {}]);
		limit.whiteList = function(arr){
			// 控制入参
			arr = toArray(arr);
			// 控制条件
			var factor = concat.apply(arrayProto, slice.call(arguments, 1));
			if( isEmpty(factor) ) return [];
			return filter(arr, function(val1){
				return whiteBlack(factor, val1);
			});
		};

		// 数据黑名单  [不改变原数组]
		limit.blackList = function(arr){
			// 控制入参
			arr = toArray(arr);
			// 控制条件
			var factor = concat.apply(arrayProto, slice.call(arguments, 1));
			if( isEmpty(factor) ) return arr;
			return filter(arr, function(val1){
				return !whiteBlack(factor, val1);
			});
		};

	///////////////
	// 函数的方法
	// bind[绑定上下文] delay[延迟] defer[异步] once[单次] defered[多异步] when[执行]
	//////////////

		// 绑定上下文
		// 当做构造函数时候的时候会返回被绑定的构造函数的上下文
		// 兼容方法的时候 instanceof 会有区别
		var bind = limit.bind = function(fun){
			// 控制入参
			if( !isFunction(fun) ) return log(fun, 'type is not function, limit.bind is called'), K;
			// 存在原生方法
			if(nativeBind) return nativeBind.apply( fun, slice.call(arguments, 1) );
			// 兼容的方法
			var args = slice.call(arguments, 1);
			function main(){
				// 如果当做普通函数
				if( !(this instanceof main) ){
					return fun.apply( args.shift(), concat.apply( args, arguments ) );
				}else{
					args.shift();
					var context = create(fun.prototype),
						tar = fun.apply( context, concat.apply( args, arguments ) );
					return isObject(tar) ? tar : context;
				};
			};
			// 咋骗，可以让兼容方法伪装的更像
			main.toString = function(){ return 'function () { [native code] }'};
			return main;
		};

		// 延迟
		var delay = limit.delay = function(fun, wait){
			var args = slice.call(arguments, 2);
			unshift.call(args, fun, undefined);
			return setTimeout(function(){ bind.apply(undefined, args)() }, wait);
		};

		// 异步
		var defer = limit.defer = function(){
			var args = slice.call(arguments);
			args.splice(1, 0, 0);
			return delay.apply(undefined, args);
		};

		// 执行一次
		var once = limit.once = function(fun){
			var args = slice.call(arguments, 2);
			unshift.call(args, fun, arguments[1]);
			return function main(){
				return !main.used ? ( main.used = true, bind.apply( undefined, concat.apply( args, arguments ) )() ) : undefined;
			};
		};

		// 异步执行后触发
		// JQ的defered[异步包裹] when[当] then[然后] always[一直] resolve[完成] reject[失败] done[成功] fail[失败]
		// my的defered[异步包裹] when[当] then[然后] always[一直] pass[传递][通过传递的参数确定是失败还是成功]
		var defered = limit.defered = function(){
			var main = {},
				list = [],
				back = [null];
			// clean[私有]
			function clean(){
				var one, temp;
				if( one = list.shift() ){
					// 状态
					main.status = 'pendding';

					defer(function(){
						try{
							var checkIsNull = ~~isNull(back[0]);
							temp = back.slice(checkIsNull);
							back.length = 0;
							back[1] = one[one.allback ? 'allback' : (checkIsNull ? 'sucback' : 'errback') ].apply(undefined, temp);
							back[0] = null;
						}catch(e){
							back[0] = e;
						};
						clean();
					});
				}else{
					main.status = 'end';
				};
			};
			// 标记位
			main.isDefered = true;
			// status
			main.status = 'init';
			// then
			main.then = function(sucback, errback){
				// 入栈
				list.push({
					sucback: sucback || K,
					errback: errback || K
				});
				return main;
			};
			// always
			main.always = function(allback){
				// 入栈
				list.push({
					allback: allback || K
				});
				return main;
			};
			// pass
			main.pass = function(err){
				if(arguments.length){
					back[0] = err;
					push.apply(back, slice.call(arguments, 1));
				};
				// 如果状态是初始化后
				clean();
				return main;
			};
			return main;
		};

		// 执行
		limit.when = function(){
			var theDefer = defered(),
				guid = arguments.length,
				sucArgs = [],
				errArgs = [];
			function endDo(){
				if(--guid <= 0){
					var isSuc = isNull(getArray(errArgs));
					isSuc && sucArgs.unshift(null);
					theDefer.pass.apply(undefined, isSuc ? sucArgs : errArgs);
				};
			};
			forEach(arguments, function(val, key){
				// 如果是异步对象
				if(val.isDefered){
					val.then(function(){
						sucArgs[key] = getArray(arguments);
					}, function(){
						errArgs[key] = getArray(arguments);
					}).always(endDo);
					val.status === 'end' && val.pass();
				}
				// 如果是函数
				else if( isFunction(val) ){
					defer(function(){
						try{
							sucArgs[key] = val();
						}catch(e){
							errArgs[key] = e;
						};
						endDo();
					});
				}else{
					sucArgs[key] = val;
					endDo();
				}
			});
			return theDefer;
		};

	///////////////
	// 日期的方法
	// formatDate[格式化日期]
	///////////////

    	var REG_EXP_DATA = /^(yyyy)(?:(.+)(MM))?(?:(.+)(dd))?(?:(.+)(HH))?(?:(.+)(mm))?(?:(.+)(ss))?(.+)?$/,
    		FUN_DATAS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds'];
		// 格式化日期
		limit.formatDate = function(timestamp, formatStr){
			// 格式化入参
			!isNumber(timestamp) && (timestamp = +new Date());
			!isString(formatStr) && (formatStr = 'yyyy-MM-dd HH:mm:ss');
			var date = new Date(timestamp);
			// 控制入参
			if( limitIsNaN(+date) ) return log('warn', 'formatDate is called', 'timestamp:',timestamp, 'date:', date), '';
			// 正常入参
			return formatStr.replace(REG_EXP_DATA, function(){
				var arr = [];
				forEach(slice.call(arguments, 1, -2), function(val, key){
					var value;
					if(val){
						if(key % 2 === 0){
							value = date[ FUN_DATAS[key/2] ]();
							// 如果是月份进一
							val === 'MM' && value++;
							// 如果是非年补零
							val !== 'yyyy' && ( value = (padChar('0', 2)+value).slice(-2) );
							arr.push(value);
						}else{
							arr.push(val);
						};
					};
				});
				return arr.join('');
			});
		};

	return limit;

});