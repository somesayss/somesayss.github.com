"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget'),
		Progress = require('modules/progress/main');

	// 类
	var Aboutme = Widget.extend({
		// 类名
		className: 'Aboutme',
		// 配置
		attrs: {

		},
		// 属性
		initProps: function(){
			var me = this;
			// 初始化进度条
			me.pro = new Progress({element: '#progress', color: '#4d90fe', onProgressDone: function(){
				this.element.parent().remove();
				this.destroy();
			}});

		},
		// 启动
		setup: function(){
			var me = this;
			// 启动进度条
			me.pro.startPro(60);
			// 页面全部加载完后结束进度条
			document.readyState !== 'complete' ? me.delegateEvents(me.jQuery(window), {
				'load': function(){
					me.pro.donePro();
				}
			}): me.pro.donePro();
		}
	});

	// 接口返回
	module.exports = Aboutme;


});