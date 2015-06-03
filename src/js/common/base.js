"use strict";
/**
 * 2014.04.29
 * 基础类。
 * version: 1.0.0
 */
define(function(require, exports) {

	//依赖
	var Class = require('class'),
		Attrs = require('attrs'),
		Aspect = require('aspect'),
		util = require('util');

	//类
	var Base = Class.create({
		//接口
		Implements: [Attrs, Aspect, util],
		//初始化
		init: function(config){
			var me = this;
			//初始化配置属性
			me.initAttrs(config);
			//把this塞入属性让attr内的属性调用 this.me
			me.getAttrs('attrs')['me'] = me;
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

	//返回
	return Base;

});