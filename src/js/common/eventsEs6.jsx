"use strict";
define(function(require, exports) {

	// 依赖
	const limit = require('common/limit2.0');

	class Events {		//单个注册
		add(type, callback){
			type = limit.toString(type);
			callback = limit.cb(callback);
			let me = this,
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
				};
			};
			return me;
		}
		//单个销毁
		remove(type){
			type = limit.toString(type);
			let me = this,
				meEvents = me.__events__,
				meEventsSpace,
				meEventsNameSpace,
				ns = getNameSpace(type);
			if(ns && meEvents && (meEventsSpace = meEvents[ns.eventType])){
				if(ns.nameSpace){
					(meEventsNameSpace = meEventsSpace[ns.nameSpace]) && limit.forEach(meEventsNameSpace, (val) => {
						limit.remove(meEventsSpace, val);
					});
					delete meEventsSpace[ns.nameSpace];
				}else{
					delete meEvents[ns.eventType]
				};
			};
		}
		// 触发
		emit(type, ...args){
			type = limit.toString(type);
			let me = this,
				meEvents = me.__events__,
				meEventsSpace,
				meEventsNameSpace,
				ns = getNameSpace(type);
			if(ns && meEvents && (meEventsSpace = meEvents[ns.eventType])){
				//存在事件的命名空间
				if(ns.nameSpace){
					return (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args);
				}else{
					return eachTrigger(meEventsSpace, me, args);
				}
			}
			return true;
		}
		//多次
		on(type, callback){
			type = limit.toString(type);
			let me = this;
			limit.forEach(type.split(','), a => me.add(a, callback));
			return me;
		}
		//多次
		off(type){
			type = limit.toString(type);
			let me = this;
			limit.forEach(type.split(','), a => me.remove(a));
			return me;
		}
	};

	//获取命名空间
	const REX = /(\w+)\.?(.*)/;
	const getNameSpace = (type) => {
		if(REX.test(type)){
			return {
				eventType: RegExp.$1,
				nameSpace: RegExp.$2
			};
		};
	};

	//循环触发
	const eachTrigger = (arr, context, args) => {
		let val = true;
		limit.forEach(arr.slice(0), function(f){
			f.apply(context, args) === false && (val = false);
		});
		return val;
	}

	return Events;

});