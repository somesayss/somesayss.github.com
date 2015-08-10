"use strict";
/**
 * 2015.02.28
 * 工具类
 * version: 1.0.0
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

	//检索数组
	var indexOfArr = util.indexOfArr = function(arr, ele, formIndex){
		if(arrPro.indexOf){
			return arrPro.indexOf.call(arr, ele, formIndex);
		}
		var length = arr.length;
		//这里做入参个数的判断
		formIndex = ~~formIndex;
		for(; formIndex < length; formIndex++){
			if(arr[formIndex] === ele){
				return formIndex;
			}
		}
		return -1;
	}

	//继承
	var extend = util.extend = function(origin) {
		breakEachArr(slice.call(arguments, 1), function(val) {
			breakEachObj(val, function(val, key){
				origin[key] = val;
			});
		})
		return origin;
	}


	return util;

});