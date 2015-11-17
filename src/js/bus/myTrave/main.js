"use strict";
/**
 * 业务类
 */
define(function(require, exports, module) {

	// 依赖
	var BaiduMap = require('modules/BaiduMap/main');

	// 类
	var MyTrave = BaiduMap.extend({
		// 类名
		className: 'MyTrave',
		// 属性
		attrs: {
			// 坐标点
			mapMarks: require('./mapMarks')
		}
	});

	// 接口
	module.exports = MyTrave;

});