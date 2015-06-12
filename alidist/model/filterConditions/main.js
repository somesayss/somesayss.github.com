"use strict";
/**
 * 组件类[筛选条件]
 * 2015,05,21 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		Widget = require('widget');

	//变量

	//类
	var FilterConditions = Widget.extend({
		events: {
			'click .JS-trigger-click': function(e){
				var me = this;
				return me.focus($(e.target));
			}
		},
		focus: function(node){
			var me = this,
				list = node.closest('.JS-target-list');
			//样式的替换
			list.find('.JS-target-label').removeClass('child-focus');
			node.closest('.JS-target-label').addClass('child-focus');
			return me;
		}
	});

	//函数

	return FilterConditions;

});