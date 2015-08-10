"use strict";
/**
 * 2015.02.28
 * 事件类
 * version: 1.0.1
 * 2015,07,12
 * 1.修改了trigger的返回值，除了回调函数返回false以外都是为true
 */
define(function(require, exports) {

	//依赖
	var Class = require('class');

	//变量
	var Rex = /(\w+)\.?(.*)/,	//aaa.bbb || aaa
		arrProSlice = Array.prototype.slice;

	//事件类
	var Events = Class.create({
		//单个注册
		add: function(type, callback){
			var me = this,
				meEvents = me.__events__,
				meEventsSpace,
				meEventsNameSpace,
				ns = getNameSpace(type);
			if(ns){
				//初始化容器
				meEvents || (meEvents = me.__events__ = {});
				//初始化事件容器
				(meEventsSpace = meEvents[ns.eventType]) || (meEventsSpace = meEvents[ns.eventType] = []);
				meEventsSpace.push(callback);
				if(ns.nameSpace){
					//初始化事件命名空间容器
					(meEventsNameSpace = meEventsSpace[ns.nameSpace]) || (meEventsNameSpace = meEventsSpace[ns.nameSpace] = []);
					meEventsNameSpace.push(callback);
				}
			}
			return me;
		},
		//单个销毁
		remove: function(type){
			var me = this,
				meEvents = me.__events__,
				meEventsSpace,
				meEventsNameSpace,
				ns = getNameSpace(type);
			if(ns && meEvents && (meEventsSpace = meEvents[ns.eventType])){
				if(ns.nameSpace){
					(meEventsNameSpace = meEventsSpace[ns.nameSpace]) && forEach(meEventsNameSpace, function(a){
						removeTarget(meEventsSpace, a);
					});
					delete meEventsSpace[ns.nameSpace];
				}else{
					delete meEvents[ns.eventType]
				}
			}
		},
		//多次
		on: function(type, callback){
			var me = this;
			forEach(type.split(','), function(a){
				me.add(a, callback);
			});
			return me;
		},
		//多次
		off: function(type){
			var me = this;
			forEach(type.split(','), function(a){
				me.remove(a);
			});
			return me;
		},
		//一次
		once: function(type, callback){
			var me = this;
			forEach(type.split(','), function(a){
				me.on(a, function(){
					me.off(a);
					callback.call(this);
				});
			});
			return me;
		},
		//触发
		trigger: function(type, context){
			var me = this,
				meEvents = me.__events__,
				meEventsSpace,
				meEventsNameSpace,
				args = arrProSlice.call(arguments),
				ns = getNameSpace(args.shift());
			if(ns && meEvents && (meEventsSpace = meEvents[ns.eventType])){
				//存在事件的命名空间
				if(ns.nameSpace){
					return (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args);
				}else{
					return eachTrigger(meEventsSpace, me, args);
				}
			}
			return true;
		},
		clearEvents: function(){
			var me = this;
			delete me.__events__;
			return me;
		}
	});

	//函数
	//获取命名空间
	function getNameSpace(type){
		if(Rex.test(type)){
			return {
				eventType: RegExp.$1,
				nameSpace: RegExp.$2
			}
		}
	}
	//数组删除目标元素
	function removeTarget(arr, tar){
		var index = indexOf(arr, tar);
		if(index !== -1){
			arr.splice(index, 1);
		}
	}
	function indexOf(arr, ele, formIndex){
		if(!arr.indexOf){
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
	//循环
	function forEach(arr, callback){
		if(arr.forEach){
			return arr.forEach(callback);
		}else{
			var index = 0,
				length = arr.length;
			for(; index < length; index++){
				callback(arr[index], index, arr);
			}
		}
	}
	//循环触发
	function eachTrigger(arr, context, args){
		var val = true;
		forEach(arr.slice(0), function(f){
			f.apply(context, args) === false && (val = false);
		});
		return val;
	}

	//返回
	return Events;

});