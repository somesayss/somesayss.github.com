"use strict";
/**
 * 编译对象
 */
define(function(require, exports, module) {

	// 依赖
	var Class = require('class');

	// 类
	var CompileObject = Class.create({
		// 类名
		className: 'CompileObject',
		// 编译方法
		formate: function(){
			var me = this,
				soure = me.get('soure'),
				value = {};
			loop.call(me, soure, function(val, key){
				value[key] = val;
			});
			return value;
		}
	});

	// 私有方法
	// 循环
	function loop(obj, callback, father){
		var me = this;
		me.limit.each(obj, function(val, key){
			var key = [key];
			father && key.unshift(father);
			key = key.join(',');
			if(me.limit.isBase(val)){
				return callback(val, key);
			}else{
				return loop.call(me, val, callback, key);
			};
		});
	};

	// 接口
	module.exports = CompileObject;
	
});