"use strict";
/**
 * 2015.02.28
 * 工具类
 * version: 1.0.0
 */
define(function(require, exports) {

	//变量
	var methodUtil = {},
		WIN = window;

	//标准的定时控制动画 这里有个BUG 不能直接使用 cache.requestAnimationFrame 需要把 var s = cache.requestAnimationFrame 保存在一个变量中
	var requestAnimationFrame = methodUtil.requestAnimationFrame = function(callback){
		var fn = 	WIN.requestAnimationFrame ||
					WIN.mozRequestAnimationFrame ||
					WIN.webkitRequestAnimationFrame ||
					WIN.msRequestAnimationFrame ||
					WIN.oRequestAnimationFrame ||
					function(callback){return setTimeout(callback, 1000/60)};
		return fn(callback);
	}

	//标准去定时控制动画
	var cancelAnimationFrame = methodUtil.cancelAnimationFrame = function(id){
		var fn = 	WIN.cancelAnimationFrame ||
					WIN.mozCancelAnimationFrame ||
					WIN.webkitCancelAnimationFrame ||
					WIN.msCancelAnimationFrame ||
					WIN.oCancelAnimationFrame ||
					function(id){return clearTimeout(id)};
		return fn(id);
	}	

	//获取随机数(整数)
	var getRandom = methodUtil.getRandom  = function(x, y){
		x = ~~x;
		y = ~~y;
		return Math.floor((y-x+1)*Math.random()+x);
	}

	return methodUtil;

});