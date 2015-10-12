"use strict";
/**
 * 进度类
 */
define(function(require, exports, module) {

	// 依赖
	var $ 				= require('$'),
		limit			= require('limit'),
		Widget 			= require('common/widget'),
		CompileObject 	= require('./compileObject'),
		CompileDom 		= require('./compileDom');

	// 类
	var Ang = Widget.extend({
		// 接口继承
		Implements: [CompileObject, CompileDom],
		// 类名
		className: 'Ang',
		// 配置
		attrs: {
			'scope': 'body',
			'soure': null
		},
		// 初始化私有属性
		initProps: function(){
			var me = this;
			// 作用域
			me.scope = $(me.get('scope'));
			var textNode = me.scope.prop('childNodes')[0];
			// textNode.nodeValue = me.limit.trim(textNode.nodeValue);
			var text1 = me.scope.prop('childNodes')[0];

			setTimeout(function(){
				// text1.replaceData(3, 8, me.get('soure').name);
			}, 1000);
			
			// console.log( me.formate() );
		}
	});


});