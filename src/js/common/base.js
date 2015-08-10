"use strict";
/**
 * 2014.04.29
 * 基础类。
 * version: 1.0.0
 * 2015,06,14 当attrs里面注册了onXxxx后，且值为函数，就会自动去注册事件
 */
define(function(require, exports) {

	//依赖
	var Class = require('class'),
		Attrs = require('attrs'),
		Aspect = require('aspect'),
		util = require('util');

	//变量
	var REX = /^on([A-Z])(.*)/;

	//类
	var Base = Class.create({
		//接口
		Implements: [Attrs, Aspect, util],
		//静态属性
		Statics: [util],
		//类名
		className: 'Base',
		//初始化
		init: function(config){
			var me = this;
			//初始化配置属性
			me.initAttrs(config);
			//把this塞入属性让attr内的属性调用 this.me
			me.getAttrs('attrs')['me'] = me;
			//对属性当中的onXXX注册的属性都进行事件绑定
			bindEvent(me);
			return me;
		},
		//销毁
		destroy: function(){
			var me = this;
			//清除事件
			me.clearEvents();
			//清除属性
			me.clearAttrs();
			//清除自定义属性方法
			for(var i in me){
				if(me.hasOwnProperty(i)){
					delete me[i];
				}
			}
			return me;
		}
	});

	//事件绑定
	function bindEvent(me){
		me.eachAttrs(function(val, key){
			//如果on打头的
			if(typeof val === 'function' && REX.test(key)){
				me.on(
					RegExp.$1.toLowerCase() + RegExp.$2,
					val
				);
			}
		});
	}


	//返回
	return Base;

});