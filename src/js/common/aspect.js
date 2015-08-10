"use strict";
/**
 * 2015.04.29
 * Aspect类
 * version: 1.0.0
 * 对事件增加 before after功能
 * 2015,07,12
 * 1.before after 的参数传递 before 会包含'方法'的函数，如果before返回false就无法触发 后面的 '方法' 和 after , after会有 '方法'的返回值和方法的参数
 */
define(function(require, exports) {

	//依赖
	var Events = require('events');

	//变量
	var arrProSlice = Array.prototype.slice,
		except = ['trigger'];//对一些函数不包装，配置项，这里

	//类
	var Aspect = Events.extend({
		//之前
		before: function(methodName, callback){
			var me = this;
			wrap(me, 'before', methodName, callback);
			return me;
		},
		//之后
		after: function(methodName, callback){
			var me = this;
			wrap(me, 'after', methodName, callback);
			return me;
		}
	});

	//函数
	//查询
	function indexOfArr(arr, ele, formIndex){
		if(arr.indexOf){
			return arr.indexOf(ele, formIndex);
		}else{
			var length = arr.length;
			formIndex = ~~formIndex;
			for(; formIndex < length; formIndex++){
				if(arr[formIndex] === ele){
					return formIndex;
				}
			}
			return -1;
		}
	}
	//包裹函数
	function wrap(me, when, methodName, callback){
		var oldMethod,
			newMethod;
		//注册事件
		me.on(when+'Method.'+methodName, callback);
		//获取老的方法
		oldMethod = me[methodName];
		//如果方法存在 且 方法未被包裹过 且 不在额外的配置项里面
		if(oldMethod && !oldMethod.__isAspect__ && indexOfArr(except, methodName) === -1){
			//封装新的方法
			newMethod = me[methodName] = function(){
				var val,
					args = arrProSlice.call(arguments);
				//调整参数
				args.unshift('beforeMethod.'+methodName);
				//触发先
				if( me.trigger.apply( me, args ) === false ){
					return me;
				}
				//调整参数
				args.shift();
				//获取老的返回值
				val = oldMethod.apply(me, args);
				//调整参数
				args.unshift(val);
				args.unshift('afterMethod.'+methodName);
				//触发后
				me.trigger.apply(me, args);
				return val;
			}
			newMethod.__isAspect__ = true;
		}
	}

	//返回
	return Aspect;

});