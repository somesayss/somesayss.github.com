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
		Aspect = require('aspect');

	//变量
	var E = function(){};

	//类
	var Base = Class.create({
		//接口
		Implements: [Attrs, Aspect],
		//初始化
		init: function(config){
			var me = this;
			//初始化配置属性
			me.initAttrs(config);
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
			//干掉销毁方法
			me.destroy = E;
			return me;
		}
	});

	//返回
	return Base;

});