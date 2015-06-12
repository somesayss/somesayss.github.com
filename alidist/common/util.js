"use strict";
/**
 * 标题：工具类
 */
define(function(require, exports) {

	//变量
	var util = {},
		arrPro = Array.prototype,
		slice = arrPro.slice;

	//空函数
	var K = util.K = function(k){return k};

	//空对象
	var O = util.O = {};

	//可能是函数
	util.maybeCallback = function(foo, defaultFoo) {
		return typeof foo === 'function' ? foo : defaultFoo || K;
	}

	//控制台
	var log = util.log = function(){
		var args = slice.call(arguments),
			type = args.shift(),
			console = window.console || O,
			log;
		//对type的处理可选值 error[默认] log warn
		if(type !== 'error' && type !== 'log' && type !== 'warn'){
			args.unshift(type);
			type = 'error'
		}
		log = console[type] || K;
		args.unshift('我的信息:');
		return log.apply(console, args);
	}

	//遍历对象
	var breakEachObj = util.breakEachObj = function(obj, callback, context){
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				if(callback.call(context, obj[i], i, obj)){
					break;
				}
			}
		}
	}

	//遍历数组
	var breakEachArr = util.breakEachArr = function(arr, callback, context){
		var index = 0,
			length = arr.length;
		for(; index < length; index++){
			if(callback.call(context, arr[index], index, arr)){
				break;
			}
		}
	}

	return util;

});
