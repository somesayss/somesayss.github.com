"use strict";
/**
 * 组件继承
 */
define(function(require, exports) {

	//依赖
	var $ = require('$'),
		Widget = require('widget'),
		util = require('common/util'),
		domUtil = require('common/domUtil');

	//类
	var myWidget = Widget.extend({
		//类名
		className: 'myWidget',
		//接口继承
		Implements: [util],
		//静态属性
		Statics: domUtil
	});

	return myWidget;

});
